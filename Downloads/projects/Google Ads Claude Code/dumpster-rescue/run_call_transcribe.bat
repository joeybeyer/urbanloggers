@echo off
REM Daily: pull SignalWire calls -> transcribe -> extract -> warehouse (billing lives in Retreaver, not here)
cd /d "C:\Users\joey\Downloads\projects\Google Ads Claude Code\dumpster-rescue"
"C:\gadsenv\Scripts\python.exe" transcribe_signalwire.py --days 7 --min-duration 20 >> signalwire_daily.log 2>&1
REM Then push qualified PAID calls (DNI gclid) to Google Ads as phone-lead conversions
"C:\gadsenv\Scripts\python.exe" upload_call_conversions.py >> call_conversions.log 2>&1
REM And push WON form leads (closed-job revenue) to Google Ads for true value-ROAS
"C:\gadsenv\Scripts\python.exe" upload_conversions.py >> conversions_upload.log 2>&1
REM Multi-tenant: push WON form leads from the ACC WAREHOUSE (BG + future clients) to their Ads
"C:\gadsenv\Scripts\python.exe" upload_form_conversions_warehouse.py >> warehouse_conv_upload.log 2>&1
REM Pull Google Ads SPEND per tenant -> warehouse (the ROAS denominator for the CRM dashboard)
"C:\gadsenv\Scripts\python.exe" pull_ad_spend.py --days 30 >> ad_spend_pull.log 2>&1
