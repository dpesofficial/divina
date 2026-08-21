/* ==========================================================================
   Divina Thapa — medical record. Vanilla JS renderer.
   All content comes from data/records.js. Nothing here needs editing to add
   new records — see HOW-TO-ADD.md.
   ========================================================================== */
(function () {
  "use strict";

  /* ---------------------------------------------------------------- icons */
  var ICON = {
    home:   '<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
    clock:  '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.2 1.9"/>',
    chart:  '<path d="M3 20h18"/><path d="M6 17V9"/><path d="M11 17V5"/><path d="M16 17v-6"/><path d="M21 17v-9"/>',
    book:   '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19a2 2 0 0 1 2-2h13"/>',
    image:  '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9.5" r="1.6"/><path d="m4 17 4.5-4.5 3 3L15 12l5 5"/>',
    thermometer: '<path d="M14 14.8V4.5a2.5 2.5 0 0 0-5 0v10.3a4.5 4.5 0 1 0 5 0"/>',
    droplet:'<path d="M12 3s6 6.1 6 10a6 6 0 0 1-12 0c0-3.9 6-10 6-10"/>',
    lungs:  '<path d="M12 4v10"/><path d="M12 9c-1 3-3 3.5-4.5 4.5C6 14.5 5 16 5 18a2 2 0 0 0 3.4 1.4C10 18 10.5 15 10.5 12"/><path d="M12 9c1 3 3 3.5 4.5 4.5C18 14.5 19 16 19 18a2 2 0 0 1-3.4 1.4C14 18 13.5 15 13.5 12"/>',
    trend:  '<path d="m3 7 6.5 6.5 4-4L21 17"/><path d="M21 12v5h-5"/>',
    chevron:'<path d="m6 9 6 6 6-6"/>',
    close:  '<path d="M18 6 6 18M6 6l12 12"/>',
    check:  '<path d="m4 12 5.5 5.5L20 7"/>',
    sun:    '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon:   '<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5"/>',
    print:  '<path d="M6 9V3h12v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M6 15h12v6H6z"/>',
    alert:  '<path d="M12 8v5"/><circle cx="12" cy="16.6" r=".7" fill="currentColor"/><path d="M10.3 3.9 2.5 17.4A2 2 0 0 0 4.2 20.4h15.6a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/>',
    pill:   '<rect x="2.5" y="8.5" width="19" height="7" rx="3.5" transform="rotate(-45 12 12)"/><path d="M8.5 8.5 15.5 15.5"/>',
    flask:  '<path d="M9 3h6"/><path d="M10 3v6.5L4.6 18a2 2 0 0 0 1.7 3h11.4a2 2 0 0 0 1.7-3L14 9.5V3"/>',
    stetho: '<path d="M6 3v6a4 4 0 0 0 8 0V3"/><path d="M10 13v2a5 5 0 0 0 10 0v-1"/><circle cx="20" cy="12" r="2"/>',
    doc:    '<path d="M14 3v5h5"/><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/>'
  };
  function svg(name, cls) {
    return '<svg class="' + (cls || "") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      (ICON[name] || "") + "</svg>";
  }

  /* -------------------------------------------------------------- helpers */
  var MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  var MON = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function d(iso) { var p = String(iso).split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function fmt(iso) { var x = d(iso); return x.getDate() + " " + MON[x.getMonth()] + " " + x.getFullYear(); }
  function fmtLong(iso) { var x = d(iso); return x.getDate() + " " + MONTHS[x.getMonth()] + " " + x.getFullYear(); }
  function monthKey(iso) { var x = d(iso); return MONTHS[x.getMonth()] + " " + x.getFullYear(); }
  function el(id) { return document.getElementById(id); }
  function paras(arr) { return (arr || []).map(function (t) { return "<p>" + esc(t) + "</p>"; }).join(""); }
  function initials(n) { return n.split(/\s+/).map(function (w) { return w[0]; }).join("").slice(0, 2).toUpperCase(); }

  var store = {
    get: function (k, dflt) { try { var v = localStorage.getItem("dt_" + k); return v === null ? dflt : JSON.parse(v); } catch (e) { return dflt; } },
    set: function (k, v) { try { localStorage.setItem("dt_" + k, JSON.stringify(v)); } catch (e) {} }
  };

  /* ------------------------------------------------------------ blocks UI */
  function renderBlocks(blocks) {
    return (blocks || []).map(function (b) {
      return '<div class="blk"><div class="blk-h">' + esc(b.h) + "</div><ul>" +
        b.items.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") + "</ul></div>";
    }).join("");
  }
  function renderVitals(v) {
    if (!v) return "";
    var keys = Object.keys(v);
    if (!keys.length) return "";
    return '<div class="vitals">' + keys.map(function (k) {
      return '<div class="vital"><div class="vital-l">' + esc(k) + '</div><div class="vital-v">' + esc(v[k]) + "</div></div>";
    }).join("") + "</div>";
  }
  function renderRefs(id) {
    var r = (typeof REFS !== "undefined") && REFS[id];
    if (!r) return "";
    return '<div class="refchips">' + Object.keys(r).map(function (k) {
      return '<span class="refchip"><b>' + esc(k) + ":</b> " + esc(r[k]) + "</span>";
    }).join("") + "</div>";
  }
  function renderThumbs(files) {
    if (!files || !files.length) return "";
    return '<div class="thumbrow">' + files.map(function (f) {
      return '<button class="gal-i" data-lb="' + esc(f) + '"><img loading="lazy" src="images/thumbs/' + esc(f) + '" alt="Scanned record ' + esc(f) + '"></button>';
    }).join("") + "</div>";
  }
  function renderSources(srcs) {
    if (!srcs || !srcs.length) return "";
    return '<div class="srcs"><div class="srcs-h">Sources</div>' + srcs.map(function (s) {
      return '<a href="' + esc(s.url) + '" target="_blank" rel="noopener noreferrer">' + esc(s.label) + "</a>";
    }).join("") + "</div>";
  }

  /* -------------------------------------------------------------- charts */
  function lineChart(cfg) {
    var W = 340, H = 168, PL = 34, PR = 12, PT = 14, PB = 26;
    var pts = cfg.points, n = pts.length;
    var vals = pts.map(function (p) { return p.value; });
    var min = Math.min.apply(null, vals), max = Math.max.apply(null, vals);
    var pad = (max - min) * 0.35 || 0.5;
    min = min - pad; max = max + pad;
    var x = function (i) { return PL + (i / (n - 1)) * (W - PL - PR); };
    var y = function (v) { return PT + (1 - (v - min) / (max - min)) * (H - PT - PB); };

    var grid = "", ticks = 4, i;
    for (i = 0; i <= ticks; i++) {
      var gv = min + (i / ticks) * (max - min), gy = y(gv);
      grid += '<line x1="' + PL + '" y1="' + gy.toFixed(1) + '" x2="' + (W - PR) + '" y2="' + gy.toFixed(1) +
        '" stroke="var(--line)" stroke-width="1"/>' +
        '<text x="' + (PL - 6) + '" y="' + (gy + 3.5).toFixed(1) + '" text-anchor="end" font-size="8.5" fill="var(--text-3)">' +
        gv.toFixed(1) + "</text>";
    }
    var dpath = pts.map(function (p, k) { return (k ? "L" : "M") + x(k).toFixed(1) + " " + y(p.value).toFixed(1); }).join(" ");
    var area = dpath + " L" + x(n - 1).toFixed(1) + " " + (H - PB) + " L" + x(0).toFixed(1) + " " + (H - PB) + " Z";

    var dots = pts.map(function (p, k) {
      var lbl = (k === 0 || k === n - 1 || k % 2 === 0)
        ? '<text x="' + x(k).toFixed(1) + '" y="' + (H - PB + 13) + '" text-anchor="middle" font-size="8" fill="var(--text-3)">' +
          d(p.date).getDate() + " " + MON[d(p.date).getMonth()] + "</text>" : "";
      return '<circle cx="' + x(k).toFixed(1) + '" cy="' + y(p.value).toFixed(1) + '" r="3.4" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"><title>' +
        esc(fmt(p.date) + " — " + p.value + " " + cfg.unit) + "</title></circle>" + lbl;
    }).join("");

    var first = pts[0].value, last = pts[n - 1].value, delta = (last - first).toFixed(1);
    var deltaTxt = (delta > 0 ? "+" : "") + delta + " " + cfg.unit;

    return '<div class="card"><div class="card-pad">' +
      '<div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:10px">' +
        '<h3 style="font-size:14.5px">' + esc(cfg.title) + "</h3>" +
        '<span style="font-size:12px;font-weight:650;color:' + (delta < 0 ? "var(--warn)" : "var(--text-2)") + '">' + esc(deltaTxt) + "</span>" +
      "</div>" +
      '<svg class="chart" viewBox="0 0 ' + W + " " + H + '" preserveAspectRatio="xMidYMid meet" role="img" aria-label="' + esc(cfg.title) + ' chart">' +
        grid +
        '<path d="' + area + '" fill="var(--accent)" opacity=".10"/>' +
        '<path d="' + dpath + '" fill="none" stroke="var(--accent)" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"/>' +
        dots +
      "</svg>" +
      '<div class="chart-note">' + esc(cfg.note) + "</div>" +
    "</div></div>";
  }

  function barChart(cfg) {
    var W = 340, H = 170, PL = 34, PR = 12, PT = 16, PB = 34;
    var pts = cfg.points;
    var max = Math.max.apply(null, pts.map(function (p) { return p.value; })) * 1.25;
    var bw = Math.min(64, (W - PL - PR) / pts.length - 22);
    var slot = (W - PL - PR) / pts.length;
    var y = function (v) { return PT + (1 - v / max) * (H - PT - PB); };

    var grid = "", i;
    for (i = 0; i <= 4; i++) {
      var gv = (i / 4) * max, gy = y(gv);
      grid += '<line x1="' + PL + '" y1="' + gy.toFixed(1) + '" x2="' + (W - PR) + '" y2="' + gy.toFixed(1) + '" stroke="var(--line)" stroke-width="1"/>' +
        '<text x="' + (PL - 6) + '" y="' + (gy + 3.5).toFixed(1) + '" text-anchor="end" font-size="8.5" fill="var(--text-3)">' + Math.round(gv) + "</text>";
    }
    var thr = "";
    if (cfg.threshold) {
      var ty = y(cfg.threshold);
      thr = '<line x1="' + PL + '" y1="' + ty.toFixed(1) + '" x2="' + (W - PR) + '" y2="' + ty.toFixed(1) +
        '" stroke="var(--ok)" stroke-width="1.6" stroke-dasharray="4 3"/>' +
        '<text x="' + (W - PR) + '" y="' + (ty - 4).toFixed(1) + '" text-anchor="end" font-size="8" fill="var(--ok)">normal &lt; ' + cfg.threshold + "</text>";
    }
    var bars = pts.map(function (p, k) {
      var cx = PL + slot * k + slot / 2, by = y(p.value), bh = (H - PB) - by;
      return '<rect x="' + (cx - bw / 2).toFixed(1) + '" y="' + by.toFixed(1) + '" width="' + bw.toFixed(1) +
        '" height="' + bh.toFixed(1) + '" rx="4" fill="var(--critical)" opacity=".85"><title>' +
        esc(fmt(p.date) + " — " + p.value + " " + cfg.unit) + "</title></rect>" +
        '<text x="' + cx.toFixed(1) + '" y="' + (by - 5).toFixed(1) + '" text-anchor="middle" font-size="11" font-weight="700" fill="var(--critical)">' + p.value + "</text>" +
        '<text x="' + cx.toFixed(1) + '" y="' + (H - PB + 13) + '" text-anchor="middle" font-size="8.5" fill="var(--text-3)">' + esc(fmt(p.date)) + "</text>" +
        (p.label ? '<text x="' + cx.toFixed(1) + '" y="' + (H - PB + 24) + '" text-anchor="middle" font-size="7.5" fill="var(--text-3)">' + esc(p.label) + "</text>" : "");
    }).join("");

    return '<div class="card"><div class="card-pad">' +
      '<h3 style="font-size:14.5px;margin-bottom:10px">' + esc(cfg.title) + "</h3>" +
      '<svg class="chart" viewBox="0 0 ' + W + " " + H + '" preserveAspectRatio="xMidYMid meet" role="img" aria-label="' + esc(cfg.title) + ' chart">' +
        grid + thr + bars +
      "</svg>" +
      '<div class="chart-note">' + esc(cfg.note) + "</div>" +
    "</div></div>";
  }

  /* ----------------------------------------------------------- HOME view */
  function viewHome() {
    var h = "";

    h += '<div class="status ' + esc(STATUS.level) + '">' +
      '<div class="status-top"><span class="pulse"></span><span class="status-lbl">Current status</span></div>' +
      "<h2>" + esc(STATUS.headline) + "</h2>" +
      "<p>" + esc(STATUS.detail) + "</p>" +
      '<div class="status-since">Ongoing since ' + esc(fmtLong(STATUS.since)) + " · last record " + esc(fmtLong(META.lastUpdated)) + "</div>" +
    "</div>";

    var nPos = URINE_TABLE.rows.filter(function (r) { return r.culture === "E. COLI"; }).length;
    var nCult = URINE_TABLE.rows.filter(function (r) { return r.culture !== "not done" && r.culture !== "—"; }).length;
    h += '<div class="stats">' +
      '<div class="stat crit"><div class="stat-v">96<small>mg/L</small></div><div class="stat-l">CRP · normal &lt; 6</div></div>' +
      '<div class="stat"><div class="stat-v">' + TIMELINE.filter(function (e) { return e.kind === "visit"; }).length + "</div>" +
        '<div class="stat-l">Clinic visits</div></div>' +
      '<div class="stat"><div class="stat-v">' + nPos + " / " + nCult + '</div><div class="stat-l">Positive urine cultures</div></div>' +
      '<div class="stat warn"><div class="stat-v">' + OUTSTANDING.length + '</div><div class="stat-l">Results missing</div></div>' +
    "</div>";

    h += '<div class="sec-h">Key findings</div>';
    h += KEY_FINDINGS.map(function (k) {
      var body = paras(k.body);
      if (k.stat) body = '<div class="acc-stat"><b>' + esc(k.stat.value) + "</b>" +
        (k.stat.unit ? "<b style='font-size:13px'>" + esc(k.stat.unit) + "</b>" : "") +
        "<span>" + esc(k.stat.label) + "</span></div>" + body;
      var jump = (k.links || []).length
        ? '<div style="margin-top:10px">' + k.links.map(function (id) {
            var r = RESEARCH.filter(function (x) { return x.id === id; })[0];
            return r ? '<a class="jump" href="#research/' + esc(id) + '">Read the research: ' + esc(r.title) + "</a><br>" : "";
          }).join("") + "</div>" : "";
      return accordion(k.id, k.tone, k.icon, k.title, k.oneLiner, body + jump);
    }).join("");

    h += '<div class="sec-h">Results still missing</div>';
    h += '<div class="card">' + OUTSTANDING.slice().sort(function (a, b) { return a.priority - b.priority; }).map(function (o) {
      return '<div class="out-item"><div class="out-n' + (o.priority > 1 ? " p2" : "") + '">' + o.priority + "</div>" +
        '<div><div class="out-t">' + esc(o.item) + '</div><div class="out-d">Ordered ' + esc(fmtLong(o.date)) + "</div>" +
        '<div class="out-w">' + esc(o.why) + "</div></div></div>";
    }).join("") + "</div>";

    h += '<div class="sec-h">Current medication</div>';
    h += '<div class="card">' + STATUS.currentMeds.map(function (m) {
      return '<div class="med cur"><div class="med-top"><div class="med-n">' + esc(m.name) + '</div><div class="med-d">' + esc(m.course) + "</div></div>" +
        '<div class="med-g">' + esc(m.generic) + '</div><div class="med-x"><b>' + esc(m.dose) + "</b></div></div>";
    }).join("") + "</div>";

    h += '<a class="jump" href="#research">See all ' + QUESTIONS.reduce(function (a, g) { return a + g.items.length; }, 0) +
      " questions for the doctor →</a>";

    h += '<div class="disclaimer">This site records only what the original papers state, plus published guideline context with sources. ' +
      "It contains no diagnosis and no treatment advice. Every decision belongs to the treating paediatrician. " +
      "Compiled from " + esc(META.compiledFrom) + ".</div>";

    return h;
  }

  function accordion(id, tone, icon, title, sub, bodyHtml, tags) {
    var pills = (tags && tags.length)
      ? '<span class="pills">' + tags.map(function (t) {
          var cls = /missing|positive|key result|most recent|abnormal/i.test(t) ? "critical"
                  : /normal|negative/i.test(t) ? "ok" : "";
          return '<span class="pill ' + cls + '">' + esc(t) + "</span>";
        }).join("") + "</span>"
      : "";
    return '<section class="acc ' + esc(tone) + '" id="' + esc(id) + '">' +
      '<button class="acc-btn" aria-expanded="false">' +
        '<span class="acc-ico">' + svg(icon) + "</span>" +
        '<span class="acc-txt"><span class="acc-t">' + esc(title) + "</span>" +
          (sub ? '<span class="acc-s">' + esc(sub) + "</span>" : "") +
          pills +
          '<span class="acc-more">Read more</span></span>' +
        '<span class="chev">' + svg("chevron") + "</span>" +
      "</button>" +
      '<div class="acc-body">' + bodyHtml + "</div>" +
    "</section>";
  }

  /* ------------------------------------------------------- TIMELINE view */
  var tlFilter = "all";
  function viewTimeline() {
    var filters = [
      { k: "all", l: "All " + TIMELINE.length },
      { k: "visit", l: "Visits" },
      { k: "lab", l: "Lab results" },
      { k: "Scheer", l: "Scheer" },
      { k: "K.B.", l: "K.B. Hospital" },
      { k: "Karuna", l: "Karuna" },
      { k: "Seer", l: "Seer" }
    ];
    var h = '<div class="view-h"><h1>Timeline</h1><p>Every recorded contact and result, newest first. Tap any card for the full detail and the original scan.</p></div>';
    h += '<div class="tl-filters">' + filters.map(function (f) {
      return '<button class="fbtn' + (tlFilter === f.k ? " on" : "") + '" data-f="' + esc(f.k) + '">' + esc(f.l) + "</button>";
    }).join("") + "</div>";

    var items = TIMELINE.slice().sort(function (a, b) { return d(b.date) - d(a.date); }).filter(function (e) {
      if (tlFilter === "all") return true;
      if (tlFilter === "visit" || tlFilter === "lab") return e.kind === tlFilter;
      return e.facilityShort === tlFilter;
    });

    if (!items.length) return h + '<div class="empty">Nothing matches that filter.</div>';

    var lastMonth = "";
    h += '<div class="tl">' + items.map(function (e) {
      var out = "";
      var mk = monthKey(e.date);
      if (mk !== lastMonth) { lastMonth = mk; out += '<div class="month-sep">' + esc(mk) + "</div>"; }
      var body =
        renderVitals(e.vitals) +
        renderBlocks(e.blocks) +
        (e.meds && e.meds.length ? '<div class="blk"><div class="blk-h">Prescribed</div><ul>' +
          e.meds.map(function (m) { return "<li>" + esc(m) + "</li>"; }).join("") + "</ul></div>" : "") +
        (e.notes && e.notes.length ? e.notes.map(function (n) {
          return '<div class="callout warn"><span class="callout-h">Note</span>' + esc(n) + "</div>"; }).join("") : "") +
        renderRefs(e.id) +
        renderThumbs(e.images);
      var head = '<div class="tl-date">' + esc(fmt(e.date)) +
        (e.dateBS ? ' <span class="bs">· BS ' + esc(e.dateBS) + "</span>" : "") + "</div>";
      out += '<div class="tl-item ' + esc(e.tone) + '"><span class="tl-node"></span>' +
        head +
        accordion(e.id, e.tone, e.kind === "lab" ? "flask" : "stetho", e.title, e.summary,
          '<div class="tl-meta" style="margin-bottom:2px">' + esc(e.facility) + " · " + esc(e.clinician) + "</div>" + body,
          e.tags) +
        "</div>";
      return out;
    }).join("") + "</div>";
    return h;
  }

  /* -------------------------------------------------------- RESULTS view */
  function viewResults() {
    var h = '<div class="view-h"><h1>Results</h1><p>Every measured value in the file, charted and compared. Lab flags are checked against paediatric reference ranges.</p></div>';

    h += '<div class="callout critical"><span class="callout-h">Read this before the numbers</span>' +
      "<b>" + esc(CBC_TABLE.note) + "</b> Three results were flagged LOW by the lab that are in fact normal for a three-year-old. " +
      'See <a href="#research/r-labranges">the research card</a> for the sources.</div>';

    h += '<div class="sec-h">Charts</div>';
    h += barChart(CHARTS.crp);
    h += lineChart(CHARTS.weight);

    h += '<div class="sec-h">Blood results compared</div>';
    h += '<div class="card"><div class="tscroll"><table><thead><tr>' +
      "<th>Test</th><th>18 Jul</th><th>21 Aug</th><th>Lab range</th><th>Lab flag</th><th>Correct for age</th><th>Verdict</th>" +
      "</tr></thead><tbody>" +
      CBC_TABLE.rows.map(function (r) {
        return '<tr class="' + esc(r.verdictTone) + '"><td><b>' + esc(r.name) + '</b><br><span class="muted">' + esc(r.unit) + "</span></td>" +
          '<td class="n">' + esc(r.jul) + '</td><td class="n">' + esc(r.aug) + "</td>" +
          '<td class="n">' + esc(r.labRange) + "</td>" +
          "<td>" + (r.labFlag === "—" ? '<span class="muted">—</span>' : '<span class="tag-miss">' + esc(r.labFlag) + "</span>") + "</td>" +
          "<td>" + esc(r.pedRange) + "</td>" +
          "<td>" + (r.verdictTone === "critical" ? '<span class="tag-pos">' : '<span class="tag-neg">') + esc(r.verdict) + "</span></td></tr>";
      }).join("") + "</tbody></table></div></div>";

    h += '<div class="sec-h">Every urine sample</div>';
    h += '<div class="card"><div class="tscroll"><table><thead><tr>' +
      URINE_TABLE.columns.map(function (c) { return "<th>" + esc(c) + "</th>"; }).join("") +
      "</tr></thead><tbody>" +
      URINE_TABLE.rows.map(function (r) {
        var cult = r.culture === "E. COLI" ? '<span class="tag-pos">E. COLI</span>'
          : r.culture === "MISSING" ? '<span class="tag-miss">MISSING</span>'
          : r.culture === "No growth" ? '<span class="tag-neg">No growth</span>' : '<span class="muted">' + esc(r.culture) + "</span>";
        return '<tr class="' + esc(r.tone) + '"><td class="n"><b>' + esc(r.date) + "</b></td><td>" + esc(r.lab) + "</td>" +
          "<td>" + (r.leuk === "POSITIVE" ? '<span class="tag-pos">POSITIVE</span>' : esc(r.leuk)) + "</td>" +
          '<td class="n">' + esc(r.pus) + '</td><td class="n">' + esc(r.rbc) + "</td><td>" + cult + "</td></tr>";
      }).join("") + "</tbody></table></div></div>";
    h += '<div class="chart-note" style="padding:0 2px">Five cultures taken, one positive. Two more were ordered and never reported.</div>';

    h += '<div class="sec-h">Every medicine prescribed</div>';
    h += '<div class="card">' + MED_HISTORY.slice().sort(function (a, b) { return d(b.date) - d(a.date); }).map(function (m) {
      return '<div class="med' + (m.current ? " cur" : "") + '">' +
        '<div class="med-top"><div class="med-n">' + esc(m.name) + (m.current ? ' <span class="pill ok">current</span>' : "") + "</div>" +
        '<div class="med-d">' + esc(fmt(m.date)) + "</div></div>" +
        '<div class="med-g">' + esc(m.generic) + "</div>" +
        '<div class="med-x"><b>' + esc(m.dose) + "</b> · " + esc(m.course) + "</div>" +
        '<div class="med-x">For ' + esc(m.reason) + " · " + esc(m.by) + "</div></div>";
    }).join("") + "</div>";

    h += '<div class="sec-h">Every diagnosis recorded</div>';
    h += '<div class="card">' + DIAGNOSES.slice().sort(function (a, b) { return d(b.date) - d(a.date); }).map(function (x) {
      var tone = x.certainty === "confirmed" ? "ok" : x.certainty === "uncertain" ? "warn" : "info";
      return '<div class="dl-row"><div class="dl-t">' + esc(x.text) + ' <span class="pill ' + tone + '">' + esc(x.certainty) + "</span></div>" +
        '<div class="dl-d">' + esc(fmtLong(x.date)) + " · " + esc(x.by) + "</div></div>";
    }).join("") + "</div>";

    return h;
  }

  /* ------------------------------------------------------- RESEARCH view */
  function viewResearch() {
    var h = '<div class="view-h"><h1>Research</h1><p>What published guidance says about each issue in this file. Every claim links to its source. This is context for a conversation with the doctor, not a diagnosis.</p></div>';

    h += RESEARCH.map(function (r) {
      var body = '<p style="font-weight:620;color:var(--text)">' + esc(r.lead) + "</p>" + paras(r.body);
      if (r.subsections) body += r.subsections.map(function (s) {
        return '<div class="blk"><div class="blk-h">' + esc(s.h) + "</div><ul>" +
          s.items.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") + "</ul></div>";
      }).join("");
      body += renderSources(r.sources);
      return accordion(r.id, r.tone, "book", r.title, r.lead, body);
    }).join("");

    h += '<div class="sec-h">Questions for the doctor</div>';
    h += '<div class="chart-note" style="padding:0 2px 10px">Tap to tick off as they are answered. Ticks are saved on this device.</div>';
    h += QUESTIONS.map(function (g, gi) {
      return '<div class="card q-group"><div class="card-pad" style="padding-bottom:6px">' +
        '<div class="blk-h" style="margin:0">' + esc(g.group) + "</div></div>" +
        g.items.map(function (q, qi) {
          var key = "q" + gi + "_" + qi;
          var done = store.get(key, false);
          return '<div class="q-item' + (done ? " done" : "") + '" data-q="' + key + '">' +
            '<span class="q-box">' + svg("check") + "</span>" +
            '<span class="q-txt">' + esc(q) + "</span></div>";
        }).join("") + "</div>";
    }).join("");

    h += '<button class="fbtn" style="width:100%;margin-top:8px;padding:12px" onclick="window.print()">' +
      "Print this page for the appointment</button>";
    return h;
  }

  /* -------------------------------------------------------- RECORDS view */
  function viewRecords() {
    var h = '<div class="view-h"><h1>Records</h1><p>All ' + DOCUMENTS.length +
      " original scanned pages, plus the reference information behind them.</p></div>";

    h += '<div class="sec-h">Scanned pages</div>';
    h += '<div class="gal">' + DOCUMENTS.slice().sort(function (a, b) { return d(b.date) - d(a.date); }).map(function (doc) {
      return '<button class="gal-i" data-lb="' + esc(doc.file) + '">' +
        '<img loading="lazy" src="images/thumbs/' + esc(doc.file) + '" alt="' + esc(doc.label) + '">' +
        '<span class="cap">' + esc(fmt(doc.date)) + "<br>" + esc(doc.label) + "</span></button>";
    }).join("") + "</div>";

    h += '<div class="sec-h">Patient details</div>';
    h += '<div class="card">' +
      dlRow("Name", PATIENT.name) +
      dlRow("Also spelled", PATIENT.altSpelling) +
      dlRow("Sex", PATIENT.sex) +
      dlRow("Age", PATIENT.ageNow + " — " + PATIENT.ageRange) +
      dlRow("Address", PATIENT.location) +
      dlRow("Guardian on file", PATIENT.guardian) +
      dlRow("Allergies", PATIENT.allergies) +
      "</div>";

    h += '<div class="sec-h">Hospital identifiers</div>';
    h += '<div class="card">' + PATIENT.ids.map(function (x) { return dlRow(x.facility, x.id); }).join("") + "</div>";

    h += '<div class="sec-h">Clinicians</div>';
    h += '<div class="card">' + PATIENT.clinicians.map(function (c) {
      return '<div class="dl-row"><div class="dl-t">' + esc(c.name) + '</div><div class="dl-d">' +
        esc(c.role) + " · " + esc(c.reg) + "<br>" + esc(c.facility) + "</div></div>";
    }).join("") + "</div>";

    h += '<div class="sec-h">Facilities</div>';
    h += '<div class="card">' + FACILITIES.map(function (f) {
      return '<div class="dl-row"><div class="dl-t">' + esc(f.name) + '</div><div class="dl-d">' +
        esc(f.role) + "<br>" + esc(f.detail) + "</div></div>";
    }).join("") + "</div>";

    h += '<div class="sec-h">Problems with the paperwork</div>';
    h += '<div class="card">' + DISCREPANCIES.map(function (x) {
      return '<div class="dl-row"><div class="dl-t">' + esc(x.title) + '</div><div class="dl-d">' + esc(x.detail) + "</div></div>";
    }).join("") + "</div>";

    h += '<div class="sec-h">Your own notes</div>';
    if (!NOTES.length) {
      h += '<div class="card"><div class="card-pad muted">No notes added yet. Notes are added in <code>data/records.js</code> under <code>NOTES</code> — see HOW-TO-ADD.md.</div></div>';
    } else {
      h += '<div class="card">' + NOTES.slice().sort(function (a, b) { return d(b.date) - d(a.date); }).map(function (n) {
        return '<div class="dl-row"><div class="dl-t">' + esc(fmtLong(n.date)) + (n.author ? " · " + esc(n.author) : "") + "</div>" +
          '<div class="dl-d">' + esc(n.text) + "</div>" + renderThumbs(n.images) + "</div>";
      }).join("") + "</div>";
    }

    h += '<div class="sec-h">What the abbreviations mean</div>';
    h += '<div class="card">' + GLOSSARY.map(function (g) {
      return '<div class="dl-row"><div class="dl-t">' + esc(g.term) + '</div><div class="dl-d">' + esc(g.meaning) + "</div></div>";
    }).join("") + "</div>";

    return h;
  }
  function dlRow(t, v) {
    return '<div class="dl-row"><div class="dl-t">' + esc(t) + '</div><div class="dl-d">' + esc(v) + "</div></div>";
  }

  /* ------------------------------------------------------------ lightbox */
  var lbList = [], lbIdx = 0;
  function docFor(file) {
    return DOCUMENTS.filter(function (x) { return x.file === file; })[0] || { file: file, label: file, date: META.lastUpdated, facility: "" };
  }
  function openLB(file, list) {
    lbList = list && list.length ? list : DOCUMENTS.map(function (x) { return x.file; });
    lbIdx = Math.max(0, lbList.indexOf(file));
    paintLB();
    el("lb").classList.add("on");
    document.body.style.overflow = "hidden";
  }
  function paintLB() {
    var f = lbList[lbIdx], doc = docFor(f);
    el("lbTitle").innerHTML = esc(doc.label) + "<small>" + esc(fmtLong(doc.date)) +
      (doc.facility ? " · " + esc(doc.facility) : "") + " · " + (lbIdx + 1) + " of " + lbList.length + "</small>";
    el("lbImg").innerHTML = '<img src="images/' + esc(f) + '" alt="' + esc(doc.label) + '">';
    el("lbPrev").disabled = lbIdx === 0;
    el("lbNext").disabled = lbIdx === lbList.length - 1;
    el("lbImg").scrollTop = 0;
  }
  function closeLB() { el("lb").classList.remove("on"); document.body.style.overflow = ""; }

  /* --------------------------------------------------------------- routes */
  var VIEWS = { home: viewHome, timeline: viewTimeline, results: viewResults, research: viewResearch, records: viewRecords };
  var current = "home";

  function render(name) {
    current = VIEWS[name] ? name : "home";
    var host = el("app");
    host.innerHTML = '<div class="wrap"><div class="view on">' + VIEWS[current]() + "</div></div>";
    Array.prototype.forEach.call(document.querySelectorAll(".nav-b"), function (b) {
      b.classList.toggle("on", b.dataset.v === current);
    });
    window.scrollTo(0, 0);
  }

  function route() {
    var hash = (location.hash || "#home").slice(1);
    var parts = hash.split("/");
    render(parts[0]);
    if (parts[1]) {
      var target = el(parts[1]);
      if (target) {
        target.classList.add("open");
        var btn = target.querySelector(".acc-btn");
        if (btn) btn.setAttribute("aria-expanded", "true");
        setTimeout(function () { target.scrollIntoView({ behavior: "smooth", block: "start" }); }, 90);
      }
    }
  }

  /* ---------------------------------------------------------------- init */
  function applyTheme(t) {
    if (t) document.documentElement.setAttribute("data-theme", t);
    else document.documentElement.removeAttribute("data-theme");
    var dark = t === "dark" || (!t && window.matchMedia("(prefers-color-scheme: dark)").matches);
    el("themeBtn").innerHTML = svg(dark ? "sun" : "moon");
  }

  document.addEventListener("DOMContentLoaded", function () {
    /* header */
    el("avatar").textContent = initials(PATIENT.name);
    el("hdrName").textContent = PATIENT.name;
    el("hdrSub").textContent = PATIENT.sex + " · " + PATIENT.ageNow + " · " + PATIENT.location.split(",")[0];

    /* nav */
    var NAV = [
      { v: "home", l: "Overview", i: "home" },
      { v: "timeline", l: "Timeline", i: "clock" },
      { v: "results", l: "Results", i: "chart" },
      { v: "research", l: "Research", i: "book" },
      { v: "records", l: "Records", i: "image" }
    ];
    el("nav").innerHTML = NAV.map(function (n) {
      return '<a class="nav-b" data-v="' + n.v + '" href="#' + n.v + '">' + svg(n.i) + "<span>" + n.l + "</span></a>";
    }).join("");

    applyTheme(store.get("theme", null));
    el("themeBtn").addEventListener("click", function () {
      var cur = store.get("theme", null);
      var dark = cur === "dark" || (!cur && window.matchMedia("(prefers-color-scheme: dark)").matches);
      var next = dark ? "light" : "dark";
      store.set("theme", next); applyTheme(next);
    });

    /* delegated interactions */
    document.addEventListener("click", function (ev) {
      var t = ev.target;

      var accBtn = t.closest && t.closest(".acc-btn");
      if (accBtn) {
        var acc = accBtn.parentElement;
        var open = acc.classList.toggle("open");
        accBtn.setAttribute("aria-expanded", open ? "true" : "false");
        var more = accBtn.querySelector(".acc-more");
        if (more) more.textContent = open ? "Show less" : "Read more";
        return;
      }

      var f = t.closest && t.closest(".fbtn[data-f]");
      if (f) { tlFilter = f.dataset.f; render("timeline"); return; }

      var g = t.closest && t.closest("[data-lb]");
      if (g) {
        var scope = g.closest(".gal") || g.closest(".thumbrow");
        var list = scope ? Array.prototype.map.call(scope.querySelectorAll("[data-lb]"), function (n) { return n.dataset.lb; }) : null;
        openLB(g.dataset.lb, list);
        return;
      }

      var q = t.closest && t.closest(".q-item");
      if (q) {
        var done = q.classList.toggle("done");
        store.set(q.dataset.q, done);
        return;
      }
    });

    el("lbClose").addEventListener("click", closeLB);
    el("lbPrev").addEventListener("click", function () { if (lbIdx > 0) { lbIdx--; paintLB(); } });
    el("lbNext").addEventListener("click", function () { if (lbIdx < lbList.length - 1) { lbIdx++; paintLB(); } });
    document.addEventListener("keydown", function (e) {
      if (!el("lb").classList.contains("on")) return;
      if (e.key === "Escape") closeLB();
      if (e.key === "ArrowLeft" && lbIdx > 0) { lbIdx--; paintLB(); }
      if (e.key === "ArrowRight" && lbIdx < lbList.length - 1) { lbIdx++; paintLB(); }
    });

    window.addEventListener("hashchange", route);
    route();
  });
})();
