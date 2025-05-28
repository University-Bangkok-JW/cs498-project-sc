@echo off
echo Stopping and cleaning up Docker containers, images, volumes, and orphans...
docker compose down --rmi all --volumes --remove-orphans

echo Done.
pause
