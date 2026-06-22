@echo off
REM Frequent (every 30 min) call capture: pull new SignalWire recordings -> transcribe -> warehouse.
REM Keeps the dashboard near-real-time with ZERO manual runs. The heavy daily chain (Google Ads
REM conversion uploads + ad-spend pull) stays in run_call_transcribe.bat at 8:20am.
cd /d "C:\Users\joey\Downloads\projects\Google Ads Claude Code\dumpster-rescue"
"C:\gadsenv\Scripts\python.exe" transcribe_signalwire.py --days 1 --min-duration 20 >> signalwire_frequent.log 2>&1
REM BG Concrete - its OWN SignalWire subproject (creds in .env); routes all calls to tenant bg-concrete.
"C:\gadsenv\Scripts\python.exe" transcribe_signalwire.py --tenant bg-concrete --days 1 --min-duration 20 >> signalwire_frequent.log 2>&1
