### Re-Build All

PowerShell

```cmd
docker compose down --rmi all --volumes --remove-orphans
docker compose build --no-cache
docker compose up -d
```
