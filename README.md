# Solar System Explorer - Setup Guide
<img width="733" height="854" alt="image" src="https://github.com/user-attachments/assets/91160b79-bd63-41b2-8d3f-05a9051c51ee" />



## Prerequisites
This project requires **Node.js** to be installed on your system.
It seems Node.js is currently missing or not in your system path.

### 1. Install Node.js
1.  Go to [nodejs.org](https://nodejs.org/)
2.  Download and install the **LTS version** (Recommended for most users).
3.  Follow the installer prompts (default settings are fine).

### 2. Verify Installation
1.  **Restart your computer** or at least **restart your terminal/VS Code** to update the system path.
2.  Open a terminal and run:
    ```bash
    node --version
    npm --version
    ```
    You should see version numbers (e.g., `v20.x.x`).

### 3. Run the App
Double-click `start_app.bat` in this folder, or run:
```bash
npm install
npm run dev
```

## Troubleshooting
If you still see "npm is not recognized", try re-installing Node.js and ensuring the "Add to PATH" option is checked during installation.
