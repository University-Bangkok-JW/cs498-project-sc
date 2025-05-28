@echo off
REM === Step 1: Fetch and Pull from Git ===
echo Fetching latest changes from Git...
git fetch
git pull

REM === Step 2: Copy Docker Compose Example to Active File ===
echo Copying docker-compose.yml.example to docker-compose.yml...
copy /Y docker-compose.yml.example docker-compose.yml

REM === Step 3: Docker Compose Restart ===
echo Bringing down containers and clearing volumes/images...
docker compose down --rmi all --volumes --remove-orphans

echo Rebuilding Docker containers with no cache...
docker compose build --no-cache

echo Starting Docker containers...
docker compose up -d

echo All done!
pause
