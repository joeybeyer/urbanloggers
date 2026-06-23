"""Mint a NEW Google refresh token that carries BOTH scopes:
  - https://www.googleapis.com/auth/adwords      (Google Ads API)
  - https://www.googleapis.com/auth/datamanager  (Data Manager API — offline conversions)

Run this ONCE. It opens your browser, you approve, and it prints a refresh token.
Paste that into .env as  GOOGLE_DM_REFRESH_TOKEN  (do NOT overwrite GOOGLE_ADS_REFRESH_TOKEN).

Usage:  python reauth_datamanager.py
Reqs :  google-auth-oauthlib (already in gadsenv), GOOGLE_ADS_CLIENT_ID/SECRET in .env,
        Data Manager API enabled in the client_id's GCP project,
        http://localhost  added as an authorized redirect URI on the OAuth client.
"""
import os, sys
sys.stdout.reconfigure(encoding="utf-8")
from dotenv import load_dotenv
from google_auth_oauthlib.flow import InstalledAppFlow

load_dotenv()
CID = os.getenv("GOOGLE_ADS_CLIENT_ID")
SEC = os.getenv("GOOGLE_ADS_CLIENT_SECRET")
SCOPES = ["https://www.googleapis.com/auth/adwords",
          "https://www.googleapis.com/auth/datamanager"]

if not CID or not SEC:
    print("Missing GOOGLE_ADS_CLIENT_ID / GOOGLE_ADS_CLIENT_SECRET in .env"); sys.exit(1)

cfg = {"installed": {
    "client_id": CID, "client_secret": SEC,
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "redirect_uris": ["http://localhost"]}}

flow = InstalledAppFlow.from_client_config(cfg, scopes=SCOPES)
# access_type=offline + prompt=consent forces Google to return a refresh_token every time.
creds = flow.run_local_server(port=8080, access_type="offline", prompt="consent",
                              authorization_prompt_message="Opening browser to approve Ads + Data Manager scopes…",
                              success_message="Done — you can close this tab and return to the terminal.")

print("\n" + "=" * 60)
print("NEW REFRESH TOKEN (add to .env as GOOGLE_DM_REFRESH_TOKEN):\n")
print(creds.refresh_token)
print("\nGranted scopes:", " ".join(creds.scopes or []))
print("=" * 60)
