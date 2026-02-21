@echo off
echo Starting Python Preview Server...
echo.
echo 1. Checking for Python...
python --version
if %ERRORLEVEL% NEQ 0 (
    echo Python not found! Please install Python.
    pause
    exit /b
)

echo.
echo 2. Opening Browser...
start http://localhost:5173

echo.
echo 3. Starting Server...
cd preview_build
python -m http.server 5173

echo.
echo Server stopped.
pause
