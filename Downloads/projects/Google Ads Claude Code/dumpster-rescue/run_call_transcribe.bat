@echo off
REM Daily: pull SignalWire calls -> transcribe -> extract -> warehouse (billing lives in Retreaver, not here)
cd /d "C:\Users\joey\Downloads\projects\Google Ads Claude Code\dumpster-rescue"
"C:\gadsenv\Scripts\python.exe" transcribe_signalwire.py --days 7 --min-duration 20 >> signalwire_daily.log 2>&1
REM DISABLED 2026-06-23: Google gated legacy ConversionUploadService.UploadClickConversions to
REM "existing users" -> our offline "Qualified Phone Lead" upload is rejected (Data Manager API now).
REM Native call tracking ("Phone call from ad" + "Phone calls on the website") already feeds bidding
REM as PRIMARY, and this offline action was only SECONDARY. Re-enable after Data Manager API migration.
REM "C:\gadsenv\Scripts\python.exe" upload_call_conversions.py >> call_conversions.log 2>&1
REM And push WON form leads (closed-job revenue) to Google Ads for true value-ROAS
"C:\gadsenv\Scripts\python.exe" upload_conversions.py >> conversions_upload.log 2>&1
REM Multi-tenant: push WON form leads from the ACC WAREHOUSE (BG + future clients) to their Ads
"C:\gadsenv\Scripts\python.exe" upload_form_conversions_warehouse.py >> warehouse_conv_upload.log 2>&1
REM Pull Google Ads SPEND per tenant -> warehouse (the ROAS denominator for the CRM dashboard)
"C:\gadsenv\Scripts\python.exe" pull_ad_spend.py --days 30 >> ad_spend_pull.log 2>&1
