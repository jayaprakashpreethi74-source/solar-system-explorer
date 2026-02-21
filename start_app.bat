@echo off
set NPM_PATH="C:\Program Files\nodejs\npm.cmd"

echo Starting Solar System Explorer...
echo Using npm at: %NPM_PATH%
echo.

if not exist %NPM_PATH% (
    echo Error: npm not found at expected location: %NPM_PATH%
    echo Please install Node.js strictly to C:\Program Files\nodejs\
    pause
    exit /b 1
)

echo Installing dependencies (this may take a few minutes)...
%NPM_PATH% install
if %ERRORLEVEL% NEQ 0 (
    echo Error installing dependencies. Please check your internet connection.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo Starting Development Server...
%NPM_PATH% run dev
pause
