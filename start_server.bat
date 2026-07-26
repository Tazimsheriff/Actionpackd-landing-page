@echo off
echo Starting Actionpackd 3D Cockpit Local Server...
start "" "http://localhost:3000"
npx -y serve -p 3000 .
