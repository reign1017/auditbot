(function () {
  const form = document.getElementById("audit-form");
  const urlInput = document.getElementById("url-input");
  const runBtn = document.getElementById("run-btn");
  const errorBanner = document.getElementById("error-banner");
  const results = document.getElementById("results");
  const resultsTitle = document.getElementById("results-title");
  const resultsGrid = document.getElementById("results-grid");
  const reportLink = document.getElementById("report-link");
  const skipSsl = document.getElementById("skip-ssl");
  const noCache = document.getElementById("no-cache");
  let lastReportBlobUrl = null;

  function setLoading(loading) {
    runBtn.disabled = loading;
    runBtn.classList.toggle("loading", loading);
  }

  function showError(msg) {
    errorBanner.textContent = msg;
    errorBanner.hidden = false;
  }

  function hideError() {
    errorBanner.hidden = true;
  }

  function scoreClass(score, low = 50, mid = 75) {
    if (score == null || score === "" || score === "N/A") return "";
    const n = Number(score);
    if (isNaN(n)) return "";
    if (n >= mid) return "good";
    if (n >= low) return "ok";
    return "poor";
  }

  function card(title, badge, body) {
    const h = document.createElement("h3");
    h.innerHTML = title + (badge ? ` <span class="badge ${badge.class}">${badge.text}</span>` : "");
    const div = document.createElement("div");
    div.className = "card";
    div.appendChild(h);
    if (typeof body === "string") {
      const p = document.createElement("p");
      p.textContent = body;
      div.appendChild(p);
    } else if (body) {
      div.appendChild(body);
    }
    return div;
  }

  function renderPerformance(t1) {
    const err = t1.error;
    if (err) {
      return card("Performance", { class: "fail", text: "Error" }, err);
    }
    const score = t1.performance_score ?? "N/A";
    const status = t1.status ?? "—";
    const a11y = t1.accessibility_score;
    const crux = t1.crux;
    const frag = document.createDocumentFragment();
    const scoreEl = document.createElement("div");
    scoreEl.className = "score-big " + scoreClass(score);
    scoreEl.textContent = String(score) + "/100";
    frag.appendChild(scoreEl);
    const p1 = document.createElement("p");
    p1.textContent = "Status: " + status;
    frag.appendChild(p1);
    if (a11y != null) {
      const pa = document.createElement("p");
      pa.textContent = "Accessibility (Lighthouse): " + a11y + "/100";
      frag.appendChild(pa);
    }
    if (crux && !crux.error) {
      const parts = [];
      if (crux.lcp_p75 != null) parts.push("LCP p75=" + crux.lcp_p75 + "ms");
      if (crux.fid_p75 != null) parts.push("FID p75=" + crux.fid_p75 + "ms");
      if (crux.cls_p75 != null) parts.push("CLS p75=" + crux.cls_p75);
      if (parts.length) {
        const pc = document.createElement("p");
        pc.textContent = "CrUX: " + parts.join(", ");
        frag.appendChild(pc);
      }
    }
    return card("Performance", { class: status === "CRITICAL FAIL" ? "fail" : "pass", text: status }, frag);
  }

  function renderTechnical(t2) {
    const err = t2.error;
    if (err) {
      return card("Technical (Schema & Meta)", { class: "fail", text: "Error" }, err);
    }
    const schema = t2.jsonld_exists ? "Yes" : "No";
    const types = (t2.schema_types_found || []).join(", ") || "None";
    const aiScore = t2.ai_visibility_score ?? 0;
    const aiMax = t2.ai_visibility_max ?? 5;
    const business = t2.business_name || "—";
    const email = t2.email || "—";
    const title = t2.title || "—";
    const sh = t2.security_headers;
    const shPass = sh && sh.pass;
    const gtm = t2.gtm_id || "—";
    const ga4 = t2.ga4_id || "—";
    const cms = t2.cms || t2.framework || t2.tech_stack_summary ? [t2.cms, t2.framework, t2.tech_stack_summary].filter(Boolean).join(" · ") : null;
    const frag = document.createDocumentFragment();
    ["Schema: " + schema, "Types: " + types, "AI Visibility: " + aiScore + "/" + aiMax, "Business: " + business, "Email: " + email, "Title: " + title, "Security headers: " + (shPass ? "PASS" : "FAIL"), "GTM: " + gtm, "GA4: " + ga4].forEach(function (line) {
      const p = document.createElement("p");
      p.textContent = line;
      frag.appendChild(p);
    });
    if (cms) {
      const pc = document.createElement("p");
      pc.textContent = "Tech: " + cms;
      frag.appendChild(pc);
    }
    const missing = t2.missing_opportunities || [];
    if (missing.length) {
      const ul = document.createElement("ul");
      missing.forEach(function (m) {
        const li = document.createElement("li");
        li.textContent = m;
        ul.appendChild(li);
      });
      frag.appendChild(ul);
    }
    const badge = aiScore >= 4 ? "pass" : aiScore >= 2 ? "warn" : "fail";
    return card("Technical (Schema & Meta)", { class: badge, text: aiScore + "/" + aiMax }, frag);
  }

  function renderAI(t3) {
    const err = t3.error;
    if (err) {
      return card("AI Conversion Audit", { class: "fail", text: "Error" }, err);
    }
    const feedback = t3.conversion_feedback;
    if (!feedback) {
      return card("AI Conversion Audit", { class: "warn", text: "No feedback" }, "No feedback received.");
    }
    const pre = document.createElement("pre");
    pre.textContent = feedback;
    return card("AI Conversion Audit", { class: "pass", text: "Done" }, pre);
  }

  function renderTone(tr) {
    const err = tr.error;
    if (err) {
      return card("Tone Score (Client-Focus)", { class: "fail", text: "Error" }, err);
    }
    const score = tr.tone_score;
    const notes = tr.tone_notes || "";
    const frag = document.createDocumentFragment();
    if (score != null) {
      const s = document.createElement("div");
      s.className = "score-big " + scoreClass(score, 4, 7);
      s.textContent = score + "/10";
      frag.appendChild(s);
    }
    if (notes) {
      const p = document.createElement("p");
      p.textContent = notes.slice(0, 500);
      frag.appendChild(p);
    }
    const badge = score == null ? "warn" : score >= 7 ? "pass" : score >= 4 ? "warn" : "fail";
    return card("Tone Score (Client-Focus)", { class: badge, text: score != null ? score + "/10" : "—" }, frag);
  }

  function renderAxe(ar) {
    const err = ar.error;
    if (err) {
      return card("Axe Accessibility", { class: "fail", text: "Error" }, err);
    }
    const count = ar.a11y_violations_count ?? 0;
    const top = ar.a11y_top_5 || "";
    const frag = document.createDocumentFragment();
    const p1 = document.createElement("p");
    p1.textContent = "Violations: " + count;
    frag.appendChild(p1);
    if (top) {
      const p2 = document.createElement("p");
      p2.textContent = "Top: " + top;
      frag.appendChild(p2);
    }
    const badge = count === 0 ? "pass" : count <= 3 ? "warn" : "fail";
    return card("Axe Accessibility", { class: badge, text: count + " issues" }, frag);
  }

  function renderSSL(t4) {
    const grade = t4.ssl_grade;
    const err = t4.ssl_error;
    if (err && !grade) {
      return card("SSL / Security", { class: "warn", text: err }, err === "skipped" ? "Skipped (faster run)." : err);
    }
    const frag = document.createDocumentFragment();
    const p = document.createElement("p");
    p.textContent = grade ? "SSL Grade: " + grade : "—";
    frag.appendChild(p);
    return card("SSL / Security", { class: grade ? "pass" : "warn", text: grade || "—" }, frag);
  }

  function render(data) {
    resultsGrid.innerHTML = "";
    resultsGrid.appendChild(renderPerformance(data.task1 || {}));
    resultsGrid.appendChild(renderTechnical(data.task2 || {}));
    resultsGrid.appendChild(renderAI(data.task3 || {}));
    resultsGrid.appendChild(renderTone(data.tone_result || {}));
    resultsGrid.appendChild(renderAxe(data.axe_result || {}));
    resultsGrid.appendChild(renderSSL(data.task4 || {}));
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    hideError();
    const url = urlInput.value.trim();
    if (!url) return;
    setLoading(true);
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: url,
          skip_ssl: skipSsl.checked,
          no_cache: noCache.checked,
        }),
      });
      const json = await res.json().catch(function () { return null; });
      if (!res.ok) {
        let msg = "Audit failed.";
        if (json && json.detail) {
          msg = Array.isArray(json.detail) ? json.detail.map(function (x) { return x.msg || x.type || ""; }).filter(Boolean).join(" ") || msg : String(json.detail);
        }
        showError(msg);
        return;
      }
      if (!json.ok) {
        showError(json.error || "Audit failed.");
        return;
      }
      render(json);
      resultsTitle.textContent = "Audit: " + json.url;
      const report = json.report || "";
      if (lastReportBlobUrl) {
        URL.revokeObjectURL(lastReportBlobUrl);
        lastReportBlobUrl = null;
      }
      if (report) {
        const blob = new Blob([report], { type: "text/plain" });
        lastReportBlobUrl = URL.createObjectURL(blob);
        reportLink.href = lastReportBlobUrl;
        reportLink.download = "audit_report.txt";
        reportLink.textContent = "Download report (.txt)";
        reportLink.hidden = false;
      } else {
        reportLink.hidden = true;
      }
      results.hidden = false;
      results.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (err) {
      showError(err.message || "Request failed.");
    } finally {
      setLoading(false);
    }
  });
})();
