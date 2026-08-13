# Next-Level Digital Presence Enhancements for Law Firm Audits

**Status**: This document lists **unapplied** improvements ranked by importance for law firm digital presence audits.

**Already Applied** ✅:
- Lighthouse accessibility score
- Security headers check
- GTM/GA4/Clarity detection
- CrUX API (real-user Core Web Vitals)
- SSL Labs grade
- Basic schema validation
- Enhanced schema detection (extruct, AI visibility scoring)
- Email/Google Maps/City/Region extraction
- DNS preflight, HTTP/HTTPS fallback, caching

---

## 🆓 FREE & SELF-HOSTED: What You Can Apply at $0

**Summary**: Everything below is **free** (no paid API) or **self-hosted free**. Use this section to prioritize zero-cost additions to the auditbot.

| # | Feature | Cost | Self-Host? | Effort | Apply to Auditbot? |
|---|---------|------|------------|--------|--------------------|
| 1 | **AI Tone Score** | $0* | N/A | Low | ✅ Uses *existing* XAI/Mistral/Gemini key |
| 2 | **axe-core A11y** | $0 | ✅ Yes | Medium | ✅ pip + Playwright, run locally |
| 3 | **Wappalyzer** | $0 | ✅ Yes | Low | ✅ `wappalyzer` Python lib or npm + subprocess |
| 4 | **GSC API** | $0 | N/A | High | ✅ Free; needs client GSC access |
| 5 | **WebPageTest** | $0 | ✅ Yes | Medium | ✅ Self-host WPT, call REST API |
| 6 | **Screaming Frog** | $0** | ✅ Yes | Medium | ✅ Free tier 500 URLs; CLI export → parse |
| 7 | **Scrapy full-site crawl** | $0 | ✅ Yes | High | ✅ Custom crawler, 100% yours |
| 8 | **GA4 API** | $0 | N/A | High | ✅ Free; needs client GA4 access |
| 9 | **DuckDuckGo “site:” check** | $0 | N/A | Low | ✅ `duckduckgo-search` / `ddgs`; no key |
| 10 | **meta robots / canonical / hreflang** | $0 | N/A | Low | ✅ Parse HTML you already fetch |

\* Tone Score uses your existing AI key; small token cost (~$0.01/audit) if you count that.  
\*\* Screaming Frog free tier: 500 URLs per crawl.

---

### 1. **AI Tone Score** — FREE (uses existing AI key)
- **Cost**: $0 extra (you already have XAI/Mistral/Gemini). Token cost ~\$0.01/audit.
- **Self-host?** No. Uses your existing AI API.
- **Apply**: Add a second prompt to Task 3 (same provider as CRO).  
  **Prompt**: *"Score this law firm homepage 1–10 for client-focus vs self-promotion. One short paragraph."*  
- **Excel**: `Tone_Score`, `Tone_Notes`.

---

### 2. **axe-core Accessibility** — FREE & SELF-HOSTED
- **Cost**: $0. Runs on your machine.
- **Self-host?** ✅ Yes. Install Playwright + axe-core, run headless browser locally.
- **Apply**:
  ```bash
  pip install playwright axe-core
  playwright install chromium
  ```
  - Fetch URL → run Playwright → inject axe → collect violations.
  - Add **Task 4b** or extend Task 4: `A11y_Violations_Count`, `A11y_Critical_Issues`, `A11y_Top_5_Issues`.
- **Docs**: [axe-core](https://github.com/dequelabs/axe-core), [playwright-python](https://playwright.dev/python/).

---

### 3. **Wappalyzer** — FREE & SELF-HOSTED
- **Cost**: $0. Use OSS Wappalyzer tech detection.
- **Self-host?** ✅ Yes. Use **Python**: `wappalyzer` (PyPI) or **Node**: `wappalyzer` + subprocess.
- **Apply**:
  ```bash
  pip install wappalyzer
  ```
  - Pass page HTML or URL → get CMS, analytics, frameworks, etc.
  - **Excel**: `CMS`, `Analytics_Tool`, `Chat_Widget`, `Framework`, `Tech_Stack_Summary`.
- **Note**: Prefer **`wappalyzer`** (PyPI) — actively maintained. Uses local rules; no API key. Alternative: `python-Wappalyzer` (older, archived).

---

### 4. **Google Search Console API** — FREE (needs access)
- **Cost**: $0. Google API is free.
- **Self-host?** N/A. Cloud API; you use OAuth.
- **Apply**: When **client shares GSC** (property access):
  - OAuth 2.0 → Search Analytics API (impressions, clicks, queries, pages).
  - **Excel**: `GSC_Impressions`, `GSC_Clicks`, `GSC_CTR`, `GSC_Top_Queries`, `Indexed_Pages`.
- **Guide**: [GSC API](https://developers.google.com/webmaster-tools/search-console-api-original).

---

### 5. **WebPageTest** — FREE & SELF-HOSTED
- **Cost**: $0 if you self-host. [Public WPT](https://www.webpagetest.org/) has limited free use.
- **Self-host?** ✅ Yes. [WebPageTest](https://github.com/WPO-Foundation/webpagetest) Docker / server.
- **Apply**:
  - Run WPT via REST API (`runtest` → poll results).
  - **Excel**: `WPT_First_Byte`, `WPT_Start_Render`, `WPT_Fully_Loaded`, `WPT_LCP`, etc.
- **Docker**: `docker run -p 4000:80 webpagetest/server` (+ agent). Use `https://your-server/` as API base.

---

### 6. **Screaming Frog** — FREE TIER (500 URLs) & SELF-HOSTED
- **Cost**: $0 for free tier (500 URLs/crawl). Desktop app on your machine.
- **Self-host?** ✅ Yes. It runs locally.
- **Apply**:
  - Run Frog in **headless/CLI** mode (if available) or automate GUI → export **CSV** (internal links, titles, meta, redirects).
  - Parse CSV in Python → compute duplicate titles, missing meta, redirect chains, orphans.
  - **Excel**: `Duplicate_Titles`, `Missing_Meta`, `Redirect_Chains`, `Orphan_Pages`.
- **Note**: Free tier limits crawl size; good for smaller law firm sites.

---

### 7. **Scrapy Full-Site Crawl** — FREE & SELF-HOSTED
- **Cost**: $0. Scrapy is OSS.
- **Self-host?** ✅ Yes. Your code, your machine.
- **Apply**:
  ```bash
  pip install scrapy
  ```
  - Crawl domain → extract titles, meta, links, status codes.
  - Derive: duplicate titles, missing meta, redirect chains, orphan pages, internal link depth.
  - **Excel**: Same as Screaming Frog; plus `Internal_Link_Depth`, `Crawl_Pages_Count`, etc.
- **Use case**: When you want full control, no third‑party desktop app.

---

### 8. **GA4 API** — FREE (needs access)
- **Cost**: $0. Google Analytics Data API is free.
- **Self-host?** N/A. Cloud API.
- **Apply**: When **client shares GA4** (property):
  - OAuth → GA4 Data API (sessions, bounce rate, top pages, conversions).
  - **Excel**: `GA4_Sessions`, `GA4_Bounce_Rate`, `GA4_Top_Pages`, `GA4_Conversions`.
- **Guide**: [GA4 Data API](https://developers.google.com/analytics/devguides/reporting/data/v1).

---

### 9. **DuckDuckGo “site:” Check** — FREE, NO API KEY
- **Cost**: $0. Uses `duckduckgo-search` / `ddgs`.
- **Self-host?** N/A. You call DDG from your script; no self‑hosting of search.
- **Apply**:
  ```bash
  pip install duckduckgo-search  # or ddgs
  ```
  - Query `site:example.com` → check if homepage (or key pages) appear, count results.
  - **Excel**: `Site_Indexed` (Y/N), `Site_Results_Count`. Cheap “is site indexed?” signal.
- **Limit**: Rate‑limiting / captcha if you overuse. Use sparingly (e.g. 1–2 queries per audit).

---

### 10. **meta robots / canonical / hreflang** — FREE (parse existing HTML)
- **Cost**: $0. You already fetch HTML in Task 2.
- **Self-host?** N/A.
- **Apply**: In Task 2, additionally parse:
  - `<meta name="robots" content="...">`  
  - `<link rel="canonical" href="...">`  
  - `hreflang` links  
  - **Excel**: `Meta_Robots`, `Canonical_URL`, `Hreflang_Count`, `Index_Directive` (index/noindex).

---

## 🆓 Free-Only Implementation Order

| Priority | Feature | Why first |
|----------|---------|-----------|
| **1** | **AI Tone Score** | Reuses existing AI; immediate value, minimal code |
| **2** | **meta robots / canonical / hreflang** | No new deps; parse current HTML |
| **3** | **Wappalyzer** | One `pip install`; better lead qualification |
| **4** | **DuckDuckGo “site:”** | No API key; cheap indexing check |
| **5** | **axe-core A11y** | Self-hosted, free; big compliance upside |
| **6** | **WebPageTest** | Self-hosted; premium perf option |
| **7** | **Screaming Frog** or **Scrapy** | Full-site mode; free tier / fully free |

---

## 📦 Self-Hosted Quick Reference

| Tool | Install | Run |
|------|---------|-----|
| **axe-core** | `pip install playwright axe-core` | Playwright + Chromium, inject axe |
| **Wappalyzer** | `pip install wappalyzer` | Pass URL/HTML, get tech stack |
| **WebPageTest** | Docker / server | `docker run ... webpagetest/server` |
| **Scrapy** | `pip install scrapy` | `scrapy runspider crawl.py` or custom project |
| **Screaming Frog** | Desktop install | Run app, export CSV, parse in Python |

---

## ✅ Apply to Auditbot Program — Checklist

| Free / self-hosted item | Where in `site_audit_bot.py` | New Excel columns |
|-------------------------|-----------------------------|-------------------|
| **AI Tone Score** | Task 3 (add 2nd prompt) or new `task3b_tone_score()` | `Tone_Score`, `Tone_Notes` |
| **meta robots / canonical / hreflang** | Task 2 (`task2_technical_check`) — parse `<meta>`, `<link>` | `Meta_Robots`, `Canonical_URL`, `Hreflang_Count` |
| **Wappalyzer** | Task 2 — after fetch, call Wappalyzer on HTML/URL | `CMS`, `Analytics_Tool`, `Chat_Widget`, `Framework` |
| **DuckDuckGo “site:”** | New helper `check_site_indexed(domain)`; call in main or Task 2 | `Site_Indexed`, `Site_Results_Count` |
| **axe-core** | New `task4b_accessibility_axe()` or extend Task 4 | `A11y_Violations_Count`, `A11y_Critical_Issues`, `A11y_Top_5` |
| **WebPageTest** | New `task1b_webpagetest()` or optional `--wpt` | `WPT_First_Byte`, `WPT_Start_Render`, `WPT_Fully_Loaded` |
| **Screaming Frog / Scrapy** | New mode `--full-site`; run crawl, parse output, aggregate | `Duplicate_Titles`, `Missing_Meta`, `Redirect_Chains`, `Orphan_Pages` |
| **GSC / GA4** | New modules; run only when client shares access | `GSC_*`, `GA4_*` (see Tier 2/3) |

**Dependencies to add** (free):
- `playwright` + `axe-core` (axe)
- `wappalyzer` (tech stack)
- `duckduckgo-search` or `ddgs` (site: check)
- `scrapy` (optional; full-site crawl)

---

## 🎯 Tier 1: Critical for Law Firm Sales (Implement First)

### 1. **Google Places API - NAP Consistency & Reviews** ⭐⭐⭐⭐⭐
**Impact**: Highest ROI for law firm audits  
**Why**: Law firms need local SEO. NAP (Name, Address, Phone) consistency is critical. Reviews drive trust.

**What it does**:
- Fetches Google Business Profile data (name, address, phone, website, hours, reviews)
- Compares site schema/footer NAP vs. Google Places
- Flags mismatches (e.g., site says "123 Main St" but Google says "123 Main Street")
- Extracts review count and average rating

**Implementation**:
```python
# Use Places API Text Search or Place Details
# Compare: schema address vs. Places formatted_address
# Add columns: NAP_Consistent, Google_Reviews_Count, Google_Rating, Place_ID
```

**Cost**: ~$0.03 per lookup (pay-per-use)  
**Excel Columns**: `NAP_Consistent`, `Google_Reviews_Count`, `Google_Rating`, `Place_ID`, `NAP_Mismatches`

**Why Tier 1**: Law firms live on local search. NAP inconsistency = lost leads. Reviews = social proof.

---

### 2. **AI Tone / Client-Focus Score** ⭐⭐⭐⭐⭐
**Impact**: Differentiates your audits, makes them more actionable  
**Why**: Law firm sites often sound self-promotional. Quantifying "client-focus" is powerful.

**What it does**:
- Uses existing AI (XAI/Grok/Mistral/Gemini) to score homepage copy 1-10
- Prompt: "Score this law firm homepage 1-10 for client-focus vs. self-promotion. One paragraph explanation."
- Identifies if copy is "award-heavy" vs. "problem-solving"

**Implementation**:
```python
# Add to Task 3 or separate Task 3b
# Use same AI provider as CRO audit
# Add columns: Tone_Score, Tone_Notes, Client_Focus_Rating
```

**Cost**: ~$0.01 per audit (uses existing AI)  
**Excel Columns**: `Tone_Score`, `Tone_Notes`, `Client_Focus_Rating`

**Why Tier 1**: Makes audits more sellable. "Your site scores 3/10 for client-focus" is actionable.

---

### 3. **axe-core Accessibility (Deep Scan)** ⭐⭐⭐⭐
**Impact**: Legal compliance + inclusion  
**Why**: Law firms need WCAG compliance. Lighthouse a11y is basic; axe finds more issues.

**What it does**:
- Runs axe-core via Playwright/pyppeteer
- Finds WCAG violations (missing alt text, color contrast, ARIA issues, etc.)
- Returns top 5-10 critical issues with fix suggestions

**Implementation**:
```python
# Install: pip install playwright axe-core
# Run headless browser, inject axe, get violations
# Add columns: A11y_Violations_Count, A11y_Critical_Issues, A11y_WCAG_Level
```

**Cost**: Free (self-hosted)  
**Excel Columns**: `A11y_Violations_Count`, `A11y_Critical_Issues`, `A11y_WCAG_Level`, `A11y_Top_5_Issues`

**Why Tier 1**: Accessibility = legal requirement. Deeper than Lighthouse.

---

## 🔥 Tier 2: High Value for Lead Scoring

### 4. **Wappalyzer / BuiltWith - Tech Stack Detection** ⭐⭐⭐⭐
**Impact**: Better lead qualification  
**Why**: Knowing CMS/tech stack helps tailor sales pitch. "WordPress site missing schema plugin" is specific.

**What it does**:
- Detects CMS (WordPress, Drupal, custom), analytics, chat widgets, CDN, etc.
- Identifies "low-hanging fruit" (e.g., WordPress + no schema = easy fix)

**Implementation**:
```python
# Option A: wappalyzer-python (free, local)
# Option B: BuiltWith API (paid, more accurate)
# Add columns: CMS, Analytics_Tool, Chat_Widget, CDN, Framework
```

**Cost**: Free (wappalyzer) or paid (BuiltWith API)  
**Excel Columns**: `CMS`, `Analytics_Tool`, `Chat_Widget`, `CDN`, `Framework`, `Tech_Stack_Summary`

**Why Tier 2**: Helps prioritize leads. "WordPress site" = easier sale than "custom code".

---

### 5. **Google Search Console API - Search Visibility** ⭐⭐⭐⭐
**Impact**: Shows real search performance  
**Why**: Impressions/clicks/queries = proof of SEO issues. "You get 50 impressions/month" is concrete.

**What it does**:
- Requires GSC access (client shares property)
- Fetches: impressions, clicks, CTR, top queries, index status
- Shows "how Google sees this site"

**Implementation**:
```python
# OAuth flow for GSC access
# Fetch search performance data
# Add columns: GSC_Impressions, GSC_Clicks, GSC_CTR, GSC_Top_Queries, Indexed_Pages
```

**Cost**: Free (needs GSC access)  
**Excel Columns**: `GSC_Impressions`, `GSC_Clicks`, `GSC_CTR`, `GSC_Top_Queries`, `Indexed_Pages`

**Why Tier 2**: Post-sale or when client shares access. Shows real search data.

---

### 6. **SERP API - Rank Tracking & "Site:" Check** ⭐⭐⭐
**Impact**: Validates site visibility  
**Why**: "Site:domain" check confirms Google indexing. Optional rank tracking for head terms.

**What it does**:
- Checks if homepage appears in "site:domain" search
- Optionally tracks rankings for 3-5 head terms (e.g., "Calgary law firm")
- Validates Google indexing status

**Implementation**:
```python
# Use SerpApi, Zenserp, or similar
# Query: "site:swansonlaw.ca"
# Optional: Track "Calgary law firm" rankings
# Add columns: Site_Indexed, Site_Results_Count, Head_Term_Rankings
```

**Cost**: Paid (~$0.05-0.10 per search)  
**Excel Columns**: `Site_Indexed`, `Site_Results_Count`, `Head_Term_Rankings`

**Why Tier 2**: Validates indexing. Rank tracking is nice-to-have.

---

## 💡 Tier 3: Enrichment & Scale

### 7. **Moz / Ahrefs / SEMrush API - Domain Authority & Backlinks** ⭐⭐⭐
**Impact**: Lead scoring / competitive intel  
**Why**: DA/backlinks = site authority. Helps prioritize leads.

**What it does**:
- Fetches domain authority, backlink count, top keywords
- Shows competitive position

**Implementation**:
```python
# Choose one: Moz API, Ahrefs API, SEMrush API
# Fetch DA, backlinks, top keywords
# Add columns: Domain_Authority, Backlink_Count, Top_Keywords
```

**Cost**: Paid (varies by provider)  
**Excel Columns**: `Domain_Authority`, `Backlink_Count`, `Top_Keywords`

**Why Tier 3**: Nice enrichment, not critical for basic audits.

---

### 8. **Hunter.io / Apollo - Email Enrichment** ⭐⭐⭐
**Impact**: Better contact data  
**Why**: When email not found on site, enrich from domain.

**What it does**:
- If no email found on site, query Hunter.io/Apollo by domain
- Returns likely business email (e.g., "info@swansonlaw.ca")

**Implementation**:
```python
# If email == "", call Hunter.io API
# Add column: Email_Source (site vs. Hunter)
```

**Cost**: Free tier / paid  
**Excel Columns**: `Email_Source`, `Email_Enriched`

**Why Tier 3**: Nice-to-have. You already extract email from site.

---

### 9. **WebPageTest API - Deep Performance Analysis** ⭐⭐
**Impact**: Premium audit option  
**Why**: Deeper than PageSpeed (filmstrip, waterfall, multi-location).

**What it does**:
- Runs WebPageTest from multiple locations
- Returns filmstrip, waterfall, detailed metrics

**Implementation**:
```python
# Use WebPageTest API (free self-host or paid)
# Run test, get detailed results
# Add columns: WPT_First_Byte, WPT_Start_Render, WPT_Fully_Loaded
```

**Cost**: Free (self-host) or paid API  
**Excel Columns**: `WPT_First_Byte`, `WPT_Start_Render`, `WPT_Fully_Loaded`

**Why Tier 3**: Overkill for basic audits. Good for premium tier.

---

### 10. **Screaming Frog Integration - Full-Site Audit Mode** ⭐⭐
**Impact**: Batch / full-site audits  
**Why**: Single-URL audits are limited. Full-site finds duplicate titles, broken links, etc.

**What it does**:
- Crawls entire site (or subdomain)
- Finds: duplicate titles, missing meta, redirect chains, orphan pages
- Feeds data into audit scoring

**Implementation**:
```python
# Option A: Run Screaming Frog CLI, parse CSV output
# Option B: Custom crawler (Scrapy)
# Add mode: --full-site or --single-url (default)
# Add columns: Duplicate_Titles, Missing_Meta, Redirect_Chains, Orphan_Pages
```

**Cost**: Free (Screaming Frog free tier) or paid license  
**Excel Columns**: `Duplicate_Titles`, `Missing_Meta`, `Redirect_Chains`, `Orphan_Pages`

**Why Tier 3**: Different use case (full-site vs. single-URL). Good for batch audits.

---

### 11. **Review APIs (Google, Trustpilot) - Aggregate Reviews** ⭐⭐
**Impact**: Social proof data  
**Why**: Review count/rating = trust signal.

**What it does**:
- Fetches reviews from Google, Trustpilot, etc.
- Aggregates rating and count

**Implementation**:
```python
# Use Google Places (already in Tier 1) or Trustpilot API
# Add columns: Trustpilot_Reviews, Trustpilot_Rating
```

**Cost**: Varies  
**Excel Columns**: `Trustpilot_Reviews`, `Trustpilot_Rating`

**Why Tier 3**: Google Places already covers Google reviews. Other platforms are nice-to-have.

---

### 12. **GA4 API (with OAuth) - Traffic & Conversion Data** ⭐⭐
**Impact**: Post-sale audits  
**Why**: Shows real traffic/conversions. Requires client access.

**What it does**:
- Fetches GA4 data: sessions, bounce rate, top pages, conversions
- Shows "how users actually use the site"

**Implementation**:
```python
# OAuth flow for GA4 access
# Fetch: sessions, bounce rate, top pages, conversions
# Add columns: GA4_Sessions, GA4_Bounce_Rate, GA4_Top_Pages, GA4_Conversions
```

**Cost**: Free (needs GA4 access)  
**Excel Columns**: `GA4_Sessions`, `GA4_Bounce_Rate`, `GA4_Top_Pages`, `GA4_Conversions`

**Why Tier 3**: Post-sale only. Requires client sharing access.

---

## 📊 Implementation Priority Summary

| Rank | Feature | Impact | Effort | Cost | Law Firm Value |
|------|---------|--------|--------|------|----------------|
| **1** | **Google Places API** | ⭐⭐⭐⭐⭐ | Medium | Low | **Critical** - NAP consistency is #1 for local SEO |
| **2** | **AI Tone Score** | ⭐⭐⭐⭐⭐ | Low | Low | **Critical** - Makes audits more sellable |
| **3** | **axe-core A11y** | ⭐⭐⭐⭐ | Medium | Free | **High** - Legal compliance |
| **4** | **Wappalyzer** | ⭐⭐⭐⭐ | Low | Free | **High** - Better lead qualification |
| **5** | **GSC API** | ⭐⭐⭐⭐ | High | Free | **High** - Post-sale or with access |
| **6** | **SERP API** | ⭐⭐⭐ | Low | Paid | **Medium** - Validates indexing |
| **7** | **Moz/Ahrefs** | ⭐⭐⭐ | Low | Paid | **Medium** - Lead scoring |
| **8** | **Hunter.io** | ⭐⭐⭐ | Low | Free tier | **Low** - Nice enrichment |
| **9** | **WebPageTest** | ⭐⭐ | Medium | Free/Paid | **Low** - Premium option |
| **10** | **Screaming Frog** | ⭐⭐ | High | Free/Paid | **Low** - Different use case |
| **11** | **Review APIs** | ⭐⭐ | Low | Varies | **Low** - Places covers Google |
| **12** | **GA4 API** | ⭐⭐ | High | Free | **Low** - Post-sale only |

---

## 🎯 Recommended Implementation Order

### Phase 1 (This Week):
1. ✅ **AI Tone Score** - Easiest win, uses existing AI
2. ✅ **Wappalyzer** - Free, quick to add

### Phase 2 (This Month):
3. ✅ **Google Places API** - Highest ROI for law firms
4. ✅ **axe-core A11y** - Legal compliance

### Phase 3 (Next Quarter):
5. ✅ **GSC API** - When you have client access
6. ✅ **SERP API** - Optional rank tracking

---

## 💰 Cost Summary

| Feature | Cost Model | Est. Cost/Audit |
|---------|------------|-----------------|
| Google Places API | Pay-per-use | ~$0.03 |
| AI Tone Score | Uses existing AI | ~$0.01 |
| axe-core | Free (self-host) | $0 |
| Wappalyzer | Free | $0 |
| GSC API | Free (needs access) | $0 |
| SERP API | Pay-per-search | ~$0.05-0.10 |
| Moz/Ahrefs | Subscription | Varies |
| Hunter.io | Free tier / paid | $0-0.01 |

**Total Phase 1+2 cost**: ~$0.04-0.05 per audit (Places + Tone)

---

## 📝 Excel Columns to Add (Ranked)

### Tier 1 (Must-Have):
- `NAP_Consistent` (Yes/No)
- `Google_Reviews_Count` (number)
- `Google_Rating` (0-5)
- `Tone_Score` (1-10)
- `Tone_Notes` (text)
- `A11y_Violations_Count` (number)
- `A11y_Critical_Issues` (text)

### Tier 2 (High Value):
- `CMS` (WordPress/Drupal/etc.)
- `Analytics_Tool` (GA4/Plausible/etc.)
- `Chat_Widget` (Yes/No)
- `GSC_Impressions` (number)
- `GSC_Clicks` (number)
- `Site_Indexed` (Yes/No)

### Tier 3 (Nice-to-Have):
- `Domain_Authority` (0-100)
- `Backlink_Count` (number)
- `Email_Source` (site/Hunter)
- `WPT_First_Byte` (ms)
- `Duplicate_Titles` (number)

---

## 🚀 Quick Start: Implement #1 & #2 First

**Google Places API** + **AI Tone Score** = biggest impact for law firm audits.

1. **Places API**: Shows NAP consistency (critical for local SEO)
2. **Tone Score**: Makes audits more actionable ("Your site is 3/10 for client-focus")

Both are low-effort, high-value additions that differentiate your audits.

---

**Last Updated**: 2026-01-26  
**Status**: Ready for implementation
