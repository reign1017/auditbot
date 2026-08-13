#!/usr/bin/env python3
"""Run the SiteAuditBot Web UI. Opens http://127.0.0.1:8000"""
import subprocess
import sys
import time
import webbrowser
from pathlib import Path

def main():
    root = Path(__file__).resolve().parent
    url = "http://127.0.0.1:8000"
    print("Starting SiteAuditBot UI at", url)
    print("Press Ctrl+C to stop.")
    p = subprocess.Popen(
        [sys.executable, "-m", "uvicorn", "app:app", "--host", "127.0.0.1", "--port", "8000"],
        cwd=root,
    )
    time.sleep(1.5)
    webbrowser.open(url)
    p.wait()

if __name__ == "__main__":
    main()
