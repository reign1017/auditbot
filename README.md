# SiteAuditBot

A CLI tool that generates comprehensive "Sales Audit Reports" for websites. Performs performance checks, technical audits, and AI-powered conversion analysis.

## Features

1. **Performance Check** - Google PageSpeed Insights (mobile score)
2. **Technical Check** - JSON-LD schema detection, meta tags, title extraction
3. **AI Conversion Audit** - CRO expert feedback on why customers leave

## Quick Start

### 1. Install Dependencies
```bash
cd auditbot
source venv/bin/activate  # If using virtual environment
pip install -r requirements.txt
```

### 2. Set Up API Keys

Create a `.env` file in the `auditbot` folder:
```
PAGESPEED_API_KEY=your_pagespeed_key
XAI_API_KEY=your_xai_key
# Optional:
MISTRAL_API_KEY=your_mistral_key
GEMINI_API_KEY=your_gemini_key
```

### 3. Run an Audit
```bash
python site_audit_bot.py https://example.com
```

## Output

- **Audit Reports**: Saved to `audits/` folder as `HHMM_DDMMYY_audit.txt`
  - Example: `1635_260126_audit.txt` (4:35 PM on Jan 26, 2026)
  
- **CSV Log**: All audits logged to `audit_log.csv` with:
  - Timestamp, URL, Performance Score, Schema Info, AI Provider, etc.

## Changing AI API Agent

The script automatically selects an AI provider based on available API keys. Priority order:

1. **XAI/Grok** (if `XAI_API_KEY` is set)
2. **Mistral AI** (if `MISTRAL_API_KEY` is set and XAI is not)
3. **Gemini** (if `GEMINI_API_KEY` is set and others are not)

### Method 1: Environment Variables (Recommended)

Edit your `.env` file:

**To use XAI:**
```
XAI_API_KEY=your_xai_key
# Comment out or remove others:
# MISTRAL_API_KEY=...
# GEMINI_API_KEY=...
```

**To use Mistral:**
```
# Comment out XAI:
# XAI_API_KEY=...
MISTRAL_API_KEY=your_mistral_key
# GEMINI_API_KEY=...
```

**To use Gemini:**
```
# Comment out others:
# XAI_API_KEY=...
# MISTRAL_API_KEY=...
GEMINI_API_KEY=your_gemini_key
```

### Method 2: Command Line Arguments

Override the `.env` file by passing keys directly:

```bash
# Force XAI
python site_audit_bot.py https://example.com --xai-key YOUR_XAI_KEY

# Force Mistral
python site_audit_bot.py https://example.com --mistral-key YOUR_MISTRAL_KEY

# Force Gemini
python site_audit_bot.py https://example.com --gemini-key YOUR_GEMINI_KEY
```

### Method 3: Temporarily Remove Keys

To switch agents, simply comment out the unwanted key in `.env`:

```bash
# Use XAI
XAI_API_KEY=xai-...
# MISTRAL_API_KEY=...  # Commented out

# Later, switch to Mistral:
# XAI_API_KEY=...  # Commented out
MISTRAL_API_KEY=...
```

## API Keys Required

### Required
- **PageSpeed Insights API Key**
  - Get from: https://developers.google.com/speed/docs/insights/v5/get-started
  - Free: 25,000 requests/day

### Choose One AI Provider

- **XAI/Grok** (Recommended)
  - Get from: https://console.x.ai/
  - Pay-as-you-go pricing
  
- **Mistral AI** (Alternative)
  - Get from: https://console.mistral.ai/
  - Free tier available
  
- **Gemini** (Alternative)
  - Get from: https://makersuite.google.com/app/apikey
  - Free tier available

## Web UI

A modern web UI runs on FastAPI. Use it to run audits from the browser.

```bash
# Install deps (includes fastapi, uvicorn)
pip install -r requirements.txt

# Run UI (opens http://127.0.0.1:8000)
python run_ui.py
```

Or run the server only:

```bash
uvicorn app:app --host 127.0.0.1 --port 8000
```

Then open **http://127.0.0.1:8000**. Enter a URL, optionally toggle **Skip SSL** / **No cache**, and click **Run audit**. Results appear as cards (Performance, Technical, AI Conversion, Tone, Axe, SSL). You can **Download report (.txt)** for the raw audit report.

## File Structure

```
auditbot/
├── .env                    # API keys (not in git)
├── site_audit_bot.py       # Main script
├── app.py                  # Web UI (FastAPI)
├── run_ui.py               # Run Web UI + open browser
├── static/                 # UI assets
│   ├── index.html
│   ├── style.css
│   └── app.js
├── requirements.txt        # Dependencies
├── README.md               # This file
├── audit_log.csv           # CSV log of all audits
└── audits/                 # Individual audit reports
    ├── 1635_260126_audit.txt
    ├── 1402_260126_audit.txt
    └── ...
```

## Examples

```bash
# Basic audit
python site_audit_bot.py https://example.com

# Audit with specific API keys
python site_audit_bot.py https://example.com \
  --pagespeed-key YOUR_KEY \
  --xai-key YOUR_XAI_KEY
```

## CSV Log Format

The `audit_log.csv` contains:
- Timestamp
- URL
- Performance Score
- Performance Status (PASS/CRITICAL FAIL)
- JSON-LD Schema Exists (Yes/No)
- Schema Types Found
- Title Tag
- AI Provider Used
- AI Feedback Received (Yes/No)
- Errors (if any)

## Requirements

- Python 3.7+
- Internet connection
- Valid API keys (PageSpeed + one AI provider)
