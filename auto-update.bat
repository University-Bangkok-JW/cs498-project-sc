@echo off
REM Change to your project directory
cd /d "C:\Path\To\Your\Project"

echo.
echo ===============================
echo      Starting Git Update
echo ===============================
git fetch
git pull

echo.
echo ===============================
echo    Stopping & Removing Docker
echo ===============================
docker compose down --rmi all --volumes --remove-orphans

echo.
echo ===============================
echo     Building Docker Images
echo ===============================
docker compose build --no-cache

echo.
echo ===============================
echo     Starting Docker Compose
echo ===============================
docker compose up -d

echo.
echo ===============================
echo     DONE! Press any key to exit
echo ===============================
pause >nul
