@echo off
echo ========================================
echo    SimpleTrade - Desarrollo Local
echo ========================================
echo.

echo [1/3] Iniciando Strapi Backend...
start "Strapi Backend" cmd /k "cd simpletrade-backend && npm run develop"

echo [2/3] Esperando 10 segundos para que Strapi inicie...
timeout /t 10 /nobreak > nul

echo [3/3] Iniciando React Frontend...
start "React Frontend" cmd /k "npm start"

echo.
echo ========================================
echo    Servicios iniciados correctamente
echo ========================================
echo.
echo Backend Strapi: http://localhost:1337
echo Frontend React: http://localhost:3000
echo Admin Strapi: http://localhost:1337/admin
echo.
echo Presiona cualquier tecla para cerrar...
pause > nul
