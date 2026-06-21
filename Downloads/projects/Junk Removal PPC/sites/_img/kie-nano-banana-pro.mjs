import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const apiBase = "https://api.kie.ai";
const createEndpoint = `${apiBase}/api/v1/jobs/createTask`;
const statusEndpoint = `${apiBase}/api/v1/jobs/recordInfo`;

function loadDotEnv(file = ".env") {
  if (!existsSync(file)) return;
  const text = readFileSync(file, "utf8");
  for (const line of text.split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)=(.*)\s*$/);
    if (!match || process.env[match[1]]) continue;
    process.env[match[1]] = match[2].replace(/^["']|["']$/g, "");
  }
}

function getApiKey() {
  const key =
    process.env.KIE_API_KEY ||
    process.env.KIE_AI_API_KEY ||
    process.env.KIE_KEY ||
    process.env.KIE_TOKEN ||
    process.env.KIEAI_API_KEY;

  if (!key) {
    throw new Error(
      "Missing Kie API key. Set KIE_API_KEY, KIE_AI_API_KEY, KIE_KEY, KIE_TOKEN, or KIEAI_API_KEY in .env."
    );
  }

  return key;
}

async function requestJson(url, options) {
  const response = await fetch(url, options);
  const body = await response.text();
  let json;
  try {
    json = JSON.parse(body);
  } catch {
    throw new Error(`Non-JSON response from ${url}: ${body.slice(0, 400)}`);
  }

  if (!response.ok || (json.code && json.code !== 200 && json.code !== 505)) {
    throw new Error(`Kie API error from ${url}: ${JSON.stringify(json)}`);
  }

  return json;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function createTask(apiKey, job) {
  const payload = {
    model: "nano-banana-pro",
    input: {
      prompt: job.prompt,
      image_input: job.image_input || [],
      aspect_ratio: job.aspect_ratio || "16:9",
      resolution: job.resolution || "1K",
      output_format: job.output_format || "png",
    },
  };

  const json = await requestJson(createEndpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const taskId = json?.data?.taskId;
  if (!taskId) {
    throw new Error(`Kie task response did not include taskId: ${JSON.stringify(json)}`);
  }

  return taskId;
}

async function pollTask(apiKey, taskId) {
  const maxAttempts = 80;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const url = `${statusEndpoint}?taskId=${encodeURIComponent(taskId)}`;
    const json = await requestJson(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    const data = json.data || {};
    const state = data.state || data.status;
    process.stdout.write(`  ${taskId}: ${state || "unknown"} (${attempt}/${maxAttempts})\n`);

    if (state === "success") {
      const result = JSON.parse(data.resultJson || "{}");
      const urls = result.resultUrls || result.urls || result.images || [];
      if (!urls.length) {
        throw new Error(`No result URLs for ${taskId}: ${data.resultJson}`);
      }
      return urls;
    }

    if (state === "fail" || state === "failed") {
      throw new Error(`Kie task failed: ${data.failMsg || JSON.stringify(data)}`);
    }

    await sleep(Math.min(3000 + attempt * 500, 10000));
  }

  throw new Error(`Timed out waiting for ${taskId}`);
}

async function downloadFile(url, outputPath) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download ${url}: ${response.status} ${response.statusText}`);
  }
  const bytes = Buffer.from(await response.arrayBuffer());
  const detectedExtension = detectImageExtension(bytes);
  const finalPath = detectedExtension
    ? outputPath.replace(/\.[^.]+$/, `.${detectedExtension}`)
    : outputPath;
  await writeFile(finalPath, bytes);
  return finalPath;
}

function detectImageExtension(bytes) {
  if (bytes[0] === 0xff && bytes[1] === 0xd8) return "jpg";
  if (
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47
  ) {
    return "png";
  }
  if (
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50
  ) {
    return "webp";
  }
  return "";
}

async function main() {
  loadDotEnv();
  const apiKey = getApiKey();
  const manifestPath = process.argv[2] || "scripts/kie-image-prompts.json";
  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  const outputDir = manifest.outputDir || "site/img/generated";
  await mkdir(outputDir, { recursive: true });

  for (const job of manifest.jobs) {
    const extension = job.output_format || "png";
    const outputPath = path.join(outputDir, `${job.slug}.${extension}`);
    process.stdout.write(`Creating ${job.slug}\n`);
    const taskId = await createTask(apiKey, job);
    const urls = await pollTask(apiKey, taskId);
    const finalPath = await downloadFile(urls[0], outputPath);
    process.stdout.write(`Saved ${finalPath}\n`);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
