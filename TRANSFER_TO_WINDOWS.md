# Transferring SiteAuditBot to Windows PC

## Step 1: Copy Files from Mac

### Files to Copy:
Copy these files/folders from your Mac to Windows:

```
auditbot/
├── .env                    # ⚠️ IMPORTANT: Contains your API keys
├── site_audit_bot.py      # Main script
├── requirements.txt        # Dependencies
├── README.md              # Documentation
├── audit_log.csv          # (if exists)
├── audit_log.xlsx         # (if exists)
└── audits/                # Folder with all audit reports
    └── *.txt              # All audit files
```

### Files to EXCLUDE (Don't Copy):
- `venv/` - Virtual environment (recreate on Windows)
- `__pycache__/` - Python cache (auto-generated)
- `*.pyc` - Compiled Python files

## Step 2: Transfer Methods

### Option A: USB Drive / External Drive
1. Copy the `auditbot` folder to USB drive
2. Plug into Windows PC
3. Copy to desired location (e.g., `C:\Users\YourName\Documents\auditbot`)

### Option B: Cloud Storage (Google Drive, Dropbox, OneDrive)
1. Upload `auditbot` folder to cloud storage
2. Download on Windows PC
3. Extract to desired location

### Option C: Network Share / File Sharing
1. Share the folder from Mac
2. Access from Windows over network
3. Copy files

## Step 3: Setup on Windows PC

### 1. Install Python
- Download Python 3.7+ from https://www.python.org/downloads/
- **IMPORTANT**: Check "Add Python to PATH" during installation
- Verify: Open Command Prompt, type `python --version`

### 2. Navigate to Auditbot Folder
```cmd
cd C:\Users\YourName\Documents\auditbot
```

### 3. Create Virtual Environment
```cmd
python -m venv venv
```

### 4. Activate Virtual Environment
```cmd
venv\Scripts\activate
```

### 5. Install Dependencies
```cmd
pip install -r requirements.txt
```

### 6. Verify .env File
Make sure your `.env` file is in the folder with your API keys:
```
PAGESPEED_API_KEY=your_key
XAI_API_KEY=your_key
```

### 7. Test It
```cmd
python site_audit_bot.py https://example.com
```

## Step 4: Windows-Specific Notes

### File Paths
- Windows uses backslashes (`\`) instead of forward slashes (`/`)
- The script handles this automatically with `Path()` objects

### Command Prompt vs PowerShell
Both work, but activation command differs:

**Command Prompt:**
```cmd
venv\Scripts\activate
```

**PowerShell:**
```powershell
venv\Scripts\Activate.ps1
```

If PowerShell gives execution policy error:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Line Endings
- Windows uses CRLF, Mac uses LF
- Python handles this automatically, but if you see issues, files are fine

## Quick Transfer Checklist

- [ ] Copy `auditbot` folder (excluding venv)
- [ ] Verify `.env` file is included (with API keys)
- [ ] Copy `audits/` folder with all reports
- [ ] Copy `audit_log.csv` or `audit_log.xlsx`
- [ ] Install Python on Windows
- [ ] Create new virtual environment
- [ ] Install dependencies
- [ ] Test with a sample URL

## Troubleshooting

### "python is not recognized"
- Python not in PATH
- Reinstall Python with "Add to PATH" checked
- Or use full path: `C:\Python3x\python.exe`

### "pip is not recognized"
- Use: `python -m pip install -r requirements.txt`

### Virtual environment activation fails
- Make sure you're in the auditbot folder
- Use correct path: `venv\Scripts\activate` (Windows)

### API keys not working
- Check `.env` file exists
- Verify no extra spaces in `.env`
- Make sure file is named exactly `.env` (not `.env.txt`)

## After Transfer

Your Windows setup should have:
- ✅ All Python scripts
- ✅ `.env` with API keys
- ✅ `audits/` folder with reports
- ✅ `audit_log.csv` or `audit_log.xlsx`
- ✅ Virtual environment (recreated)
- ✅ All dependencies installed

Then you can run audits just like on Mac!
