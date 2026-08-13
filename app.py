#!/usr/bin/env python3
"""
SiteAuditBot Web UI - FastAPI backend.

Run: uvicorn app:app --reload
Then open http://127.0.0.1:8000
"""

import os
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.responses import HTMLResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

load_dotenv()

# Import after dotenv so env vars are set
from site_audit_bot import run_audit

app = FastAPI(
    title="SiteAuditBot",
    description="Comprehensive site audit for law firms",
    version="1.0.0",
)

STATIC_DIR = Path(__file__).resolve().parent / "static"
STATIC_DIR.mkdir(exist_ok=True)


class AuditRequest(BaseModel):
    url: str
    skip_ssl: bool = True
    no_cache: bool = True


@app.get("/", response_class=HTMLResponse)
def index():
    """Serve the UI."""
    p = STATIC_DIR / "index.html"
    if not p.exists():
        raise HTTPException(status_code=404, detail="static/index.html not found")
    return FileResponse(p)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/api/audit")
def api_audit(req: AuditRequest):
    """Run audit for given URL. Returns structured results."""
    url = req.url.strip()
    if not url:
        raise HTTPException(status_code=400, detail="URL is required")
    if not url.startswith(("http://", "https://")):
        url = "https://" + url
    out = run_audit(
        url,
        skip_ssl=req.skip_ssl,
        no_cache=req.no_cache,
        quiet=True,
    )
    if not out.get("ok"):
        raise HTTPException(status_code=400, detail=out.get("error", "Audit failed"))
    return out


if STATIC_DIR.exists():
    app.mount("/static", StaticFiles(directory=str(STATIC_DIR)), name="static")
