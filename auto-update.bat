@echo off
setlocal enabledelayedexpansion

REM === Step 0: Fetch and Pull from Git ===
echo Fetching latest changes from Git...
git fetch
git pull

REM === Step 1: Read DEEPSEEK_TOKEN from local environment and inject it ===
echo Reading DEEPSEEK_TOKEN from local environment...
set "TOKEN=%DEEPSEEK_TOKEN%"

if "%TOKEN%"=="" (
    echo ERROR: DEEPSEEK_TOKEN is not set in the environment.
    pause
    exit /b 1
)

REM === Step 2: Copy Docker Compose Example to Active File ===
echo Copying docker-compose.yml.example to docker-compose.yml...
copy /Y "docker-compose.yml.example" "docker-compose.yml"

REM === Step 3: Inject DEEPSEEK_TOKEN into docker-compose.yml ===
echo Injecting DEEPSEEK_TOKEN into docker-compose.yml...
powershell -Command "(Get-Content 'docker-compose.yml') -replace 'DEEPSEEK_TOKEN=', 'DEEPSEEK_TOKEN=%TOKEN%' | Set-Content 'docker-compose.yml'"

REM === Step 4: Docker Compose Restart ===
echo Bringing down containers and clearing volumes/images...
docker compose down --rmi all --volumes --remove-orphans

echo Rebuilding Docker containers with no cache...
docker compose build --no-cache

echo Starting Docker containers...
docker compose up -d

REM === Step 5: Open browser tabs ===
echo Opening localhost tabs...
start "" http://localhost:3000
start "" http://localhost:5173

REM === Step 6: Log Docker Output ===
for /f %%a in ('powershell -NoProfile -Command "Get-Date -Format \"yyyy-MM-dd-HH-mm-ss\""') do set "timestamp=%%a"

if not exist logs (
    mkdir logs
)

echo Saving logs at %timestamp%...
docker logs cs498-client > "logs\%timestamp%-client.txt" 2>&1
docker logs cs498-server > "logs\%timestamp%-server.txt" 2>&1
docker logs postgres_db > "logs\%timestamp%-postgres.txt" 2>&1
echo Logs saved in 'logs\' folder.

echo All done!
pause
