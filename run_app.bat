@echo off
echo Running Vehicle Tax Renewal System...
echo.

REM Check if Node.js is installed
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Node.js is not installed or not in PATH.
    echo Please download and install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Display Node.js and npm versions
echo Node.js version:
node -v
echo.
echo npm version:
npm -v
echo.

REM Install dependencies
echo Installing dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo Failed to install dependencies.
    pause
    exit /b 1
)
echo.

REM Start the application
echo Starting the application...
echo The application will be available at http://localhost:3000
start "" http://localhost:3000
call npm start

pause 