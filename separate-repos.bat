@echo off
echo ==========================================
echo    SIMPLETRADE - SEPARACION DE REPOS
echo ==========================================
echo.

echo [1/4] Verificando estructura del proyecto...
if not exist "simpletrade-backend" (
    echo ERROR: No se encuentra la carpeta simpletrade-backend
    pause
    exit /b 1
)

echo [2/4] Creando carpeta para backend separado...
mkdir ..\simpletrade-backend-repo 2>nul
xcopy "simpletrade-backend\*" "..\simpletrade-backend-repo\" /E /I /Q

echo [3/4] Frontend repository listo en esta carpeta
echo - Backend excluido via .gitignore
echo - Solo se subira: src/, public/, package.json, etc.

echo [4/4] Backend repository creado en: ..\simpletrade-backend-repo\
echo.

echo ==========================================
echo           PROXIMOS PASOS
echo ==========================================
echo.
echo FRONTEND (carpeta actual):
echo   git add .
echo   git commit -m "Frontend for Coolify deployment"
echo   git push origin main
echo.
echo BACKEND (carpeta ../simpletrade-backend-repo):
echo   cd ..\simpletrade-backend-repo
echo   git init
echo   git add .
echo   git commit -m "Backend for Coolify deployment"
echo   git remote add origin [TU-REPO-BACKEND-URL]
echo   git push -u origin main
echo.

echo Presiona cualquier tecla para continuar...
pause >nul
