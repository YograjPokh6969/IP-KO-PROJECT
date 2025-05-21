# How to Run the Vehicle Tax Renewal System

## Prerequisites
- Node.js and npm installed
- Git (optional, for cloning the repository)

## Setup Instructions

### 1. Fix PowerShell Execution Policy Issue

You need to allow script execution in PowerShell to run npm commands. There are several ways to do this:

#### Option 1: Temporary Bypass
Open PowerShell as Administrator and run:
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```
This will only affect the current PowerShell session.

#### Option 2: Change the Policy Permanently
Open PowerShell as Administrator and run:
```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```
This will allow scripts that you've written on your local computer to run, but scripts downloaded from the internet will need to be signed by a trusted publisher.

### 2. Install Node.js and npm

If you haven't already installed Node.js and npm:
1. Download the installer from [Node.js website](https://nodejs.org/)
2. Run the installer and follow the steps
3. Verify installation by running `node -v` and `npm -v` in a new Command Prompt

### 3. Run the Application

1. Navigate to the project directory:
```
cd vehicle-tax-renewal
```

2. Install dependencies:
```
npm install
```

3. Start the development server:
```
npm start
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

### 4. Login Credentials

- **User Login**:
  - Username: `user`
  - Password: `password`

- **Admin Login**:
  - Username: `admin`
  - Password: `admin123`

## Troubleshooting

### TypeScript Errors
The application might show TypeScript errors but should still run in development mode. These errors don't prevent the application from functioning.

### Command Prompt Alternative
If PowerShell gives you trouble, try using Command Prompt (cmd.exe) instead. The npm commands should work there without changing execution policies. 