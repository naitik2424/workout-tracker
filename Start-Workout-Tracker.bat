@echo off
echo ===================================================
echo           Starting Workout Tracker...
echo ===================================================
echo.

:: Change directory to where this batch file is located
cd /d "%~dp0"

:: Check if node_modules folder exists, if not run npm install
if not exist node_modules (
    echo [INFO] node_modules folder not found.
    echo [INFO] Installing dependencies (first-time setup). Please wait...
    echo.
    call npm install
    if %ERRORLEVEL% neq 0 (
        echo.
        echo [ERROR] npm install failed! Please make sure Node.js is installed.
        echo Get Node.js from: https://nodejs.org/
        pause
        exit /b %ERRORLEVEL%
    )
)

echo [INFO] Starting the development server...
echo [INFO] This will automatically open the app in your browser.
echo.
call npm run dev

pause
