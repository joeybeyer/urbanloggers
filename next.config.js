/** @type {import('next').NextConfig} */
const CITIES = [
  'milwaukee', 'wauwatosa', 'west-allis', 'greenfield', 'south-milwaukee', 'waukesha',
  'brookfield', 'new-berlin', 'pewaukee', 'mequon', 'cedarburg', 'port-washington',
  'racine', 'mount-pleasant',
]
// combo slug -> canonical service hub (hub-and-spoke: no city+service combo pages)
const COMBO_TO_HUB = {
  'tree-removal': '/tree-removal',
  'tree-trimming': '/tree-trimming-pruning',
  'stump-grinding': '/stump-grinding',
  'emergency': '/emergency-tree-service',
  'log-milling': '/log-milling',
}

const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  async redirects() {
    const out = []
    for (const city of CITIES) {
      for (const [combo, hub] of Object.entries(COMBO_TO_HUB)) {
        out.push({ source: `/${city}/${combo}`, destination: hub, permanent: true })
      }
    }
    return out
  },
}

module.exports = nextConfig
