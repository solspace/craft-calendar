/**
 * SolspaceAI usage dashboard (Craft CP). Loaded only with SolspaceAiAssetBundle.
 */
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";

Chart.register(
  BarController,
  BarElement,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
);

const BLUE = "rgba(64, 195, 247, 0.9)";
const PINK = "#da127d";

/** @type {Chart|null} */
let usageChartInstance = null;

function T(key) {
  return typeof Craft !== "undefined" ? Craft.t("calendar", key) : key;
}

function Ta(key) {
  return typeof Craft !== "undefined" ? Craft.t("app", key) : key;
}

function esc(s) {
  return String(s == null ? "" : s).replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
  );
}

function fmtDate(s) {
  if (!s) return "—";
  try {
    return new Date(s).toLocaleString();
  } catch {
    return String(s);
  }
}

function fmtDateShort(s) {
  if (!s) return "—";
  try {
    return new Date(s).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return String(s);
  }
}

function fmtNum(n) {
  if (n == null || n === "") return "—";
  const x = Number(n);
  return Number.isFinite(x) ? x.toLocaleString() : String(n);
}

function fmtCredits(n) {
  if (n == null) return "—";
  const x = Number(n);
  return Number.isFinite(x) ? x.toFixed(2) : String(n);
}

function show(el, on) {
  if (!el) return;
  el.classList.toggle("solspaceai-hidden", !on);
}

function setText(id, txt) {
  const el = document.getElementById(id);
  if (el) el.textContent = txt;
}

function translateCreditStatus(raw) {
  if (!raw) return T("Unknown");
  switch (raw) {
    case "Free trial":
      return T("Free trial");
    case "Active":
      return T("Active");
    case "Low credits":
      return T("Low credits");
    case "Out of credits":
      return T("Out of credits");
    default:
      return raw;
  }
}

function logStatusLabel(status) {
  if (status === "success") return T("Success");
  if (status === "failure") return T("Failed");
  return status || "—";
}

function latestPurchaseDate(history) {
  const rows = Array.isArray(history) ? history : [];
  const dates = rows.map((e) => (e?.paid_at ? String(e.paid_at) : "")).filter(Boolean);
  if (!dates.length) return null;
  dates.sort((a, b) => b.localeCompare(a));
  return dates[0];
}

function formatBundlePrice(price, currency) {
  const cur = (currency || "usd").toLowerCase();
  const n = typeof price === "number" ? price : parseFloat(price);
  if (price == null || !Number.isFinite(n)) return "—";
  const rounded = Math.round(n);
  const fmt = rounded.toLocaleString();
  if (cur === "eur") return `\u20AC${fmt}`;
  if (cur === "usd") return `$${fmt}`;
  return `${fmt} ${cur.toUpperCase()}`;
}

function destroyUsageChart() {
  if (usageChartInstance) {
    usageChartInstance.destroy();
    usageChartInstance = null;
  }
  const el = document.getElementById("solspaceai-chart");
  if (el) el.innerHTML = "";
}

function xLabelForMetric(dateStr) {
  if (!dateStr) return "—";
  try {
    return new Date(dateStr).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });
  } catch {
    return String(dateStr);
  }
}

function renderChart(metrics) {
  const el = document.getElementById("solspaceai-chart");
  const sec = document.getElementById("solspaceai-chart-section");
  if (!el || !sec) return;

  destroyUsageChart();

  if (!metrics?.length) {
    sec.classList.add("solspaceai-hidden");
    return;
  }

  sec.classList.remove("solspaceai-hidden");

  const hasDuration = metrics.some(
    (m) => typeof m.duration_seconds === "number" && m.duration_seconds > 0,
  );

  const labels = metrics.map((m) => xLabelForMetric(m.date));
  const credits = metrics.map((m) => Number(m.credits) || 0);
  const durations = metrics.map((m) => Number(m.duration_seconds) || 0);

  const datasets = [
    {
      type: "bar",
      label: T("Credits"),
      data: credits,
      yAxisID: "y",
      backgroundColor: BLUE,
      borderRadius: 4,
      maxBarThickness: 40,
      order: 2,
    },
  ];

  if (hasDuration) {
    datasets.push({
      type: "line",
      label: T("Duration"),
      data: durations,
      yAxisID: "y1",
      borderColor: PINK,
      backgroundColor: PINK,
      borderWidth: 2,
      tension: 0.25,
      pointRadius: 3,
      pointHoverRadius: 5,
      order: 1,
    });
  }

  const canvas = document.createElement("canvas");
  el.appendChild(canvas);

  usageChartInstance = new Chart(canvas.getContext("2d"), {
    type: "bar",
    data: {
      labels,
      datasets,
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: {
          display: true,
          position: "top",
          align: "end",
          labels: { boxWidth: 8, usePointStyle: true },
        },
        tooltip: {
          callbacks: {
            title(items) {
              const i = items[0]?.dataIndex;
              const d = metrics[i]?.date;
              return d ? fmtDateShort(d) : "";
            },
            label(ctx) {
              const v = ctx.parsed.y;
              if (ctx.dataset.yAxisID === "y1") {
                return `${ctx.dataset.label}: ${Number(v).toFixed(1)}s`;
              }
              return `${ctx.dataset.label}: ${Number(v).toLocaleString()}`;
            },
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { maxRotation: 0, autoSkip: true, maxTicksLimit: 10 },
        },
        y: {
          type: "linear",
          position: "left",
          beginAtZero: true,
          title: { display: false },
          ticks: {
            callback: (value) => (typeof value === "number" ? value.toLocaleString() : value),
          },
          grid: { color: "rgba(0,0,0,0.06)" },
        },
        y1: {
          type: "linear",
          position: "right",
          display: hasDuration,
          beginAtZero: true,
          grid: { drawOnChartArea: false },
          ticks: {
            callback: (value) => (typeof value === "number" ? `${value}s` : value),
          },
        },
      },
    },
  });
}

function renderCards(d, plans) {
  const color = d.credit_status_color || null;
  const statusStyle = color ? ` style="color:${esc(color)}"` : "";
  const dotStyle = color ? ` style="background:${esc(color)}"` : "";
  const latest = latestPurchaseDate(d.payment_history);
  let sinceHtml = "";
  if (d.credit_status === "Active" && latest) {
    sinceHtml = `<div class="solspaceai-status-meta">${esc(T("Since"))} ${esc(fmtDateShort(latest))}</div>`;
  }
  let html = "";
  if (d.credits_remaining != null || d.credits_total != null) {
    html += `<div class="solspaceai-card solspaceai-credit-card">
            <div class="solspaceai-card-value">${esc(fmtNum(d.credits_remaining != null ? d.credits_remaining : "—"))}</div>
            <div class="solspaceai-card-label">${esc(T("Credits remaining"))}</div>
        </div>`;
  }
  html += `<div class="solspaceai-card">
        <div class="solspaceai-status-row">
            <span class="solspaceai-status-dot"${dotStyle}></span>
            <span class="solspaceai-status-value"${statusStyle}>${esc(translateCreditStatus(d.credit_status))}</span>
        </div>
        ${sinceHtml}
        <div class="solspaceai-card-actions">
            <button type="button" class="btn submit" id="solspaceai-btn-add-credits">${esc(T("Add credits"))}</button>
        </div>
    </div>`;
  const wrap = document.getElementById("solspaceai-cards");
  if (wrap) wrap.innerHTML = html;
  const btn = document.getElementById("solspaceai-btn-add-credits");
  if (btn) {
    btn.addEventListener("click", () => openPlansModal(d, plans || {}));
  }
}

function renderLogs(d) {
  const rows = Array.isArray(d.request_logs) ? d.request_logs : [];
  const sec = document.getElementById("solspaceai-logs-section");
  const el = document.getElementById("solspaceai-logs");
  if (!sec || !el) return;
  if (!rows.length) {
    sec.classList.add("solspaceai-hidden");
    el.innerHTML = "";
    return;
  }
  sec.classList.remove("solspaceai-hidden");
  let html = `<table class="solspaceai-metrics-table"><thead><tr>
        <th>${esc(T("Date & Time"))}</th>
        <th>${esc(T("Status"))}</th>
        <th>${esc(T("Credits"))}</th>
        <th>${esc(T("Duration"))}</th>
        <th>${esc(T("Request ID"))}</th>
    </tr></thead><tbody>`;
  rows.forEach((r) => {
    const dt = r.requested_at
      ? fmtDate(r.requested_at)
      : r.date
        ? fmtDateShort(r.date)
        : T("Unknown");
    html += `<tr>
            <td>${esc(dt)}</td>
            <td>${esc(logStatusLabel(r.status))}</td>
            <td>${esc(r.credits != null ? `${fmtCredits(r.credits)} ${T("credits")}` : "—")}</td>
            <td>${esc(r.duration_s || "—")}</td>
            <td><code>${esc(r.request_id || "—")}</code></td>
        </tr>`;
  });
  html += "</tbody></table>";
  el.innerHTML = html;
}

function sortPaymentsNewest(history) {
  const list = Array.isArray(history) ? history.slice() : [];
  list.sort((a, b) => {
    const ta = a.paid_at ? Date.parse(a.paid_at) : 0;
    const tb = b.paid_at ? Date.parse(b.paid_at) : 0;
    return tb - ta;
  });
  return list;
}

function formatPaymentRow(entry, displayCurrency) {
  const amt = formatBundlePrice(entry.package_price, displayCurrency);
  const c = entry.credits;
  const cred = c == null ? "—" : Number.isInteger(Number(c)) ? String(c) : String(c);
  return `<tr><td>${esc(fmtDateShort(entry.paid_at))}</td><td>${esc(amt)}</td><td>${esc(cred)}</td></tr>`;
}

function openPlansModal(usage, plans) {
  const $ = window.jQuery;
  if (!$) {
    Craft.cp.displayError(T("Could not open purchase dialog."));
    return;
  }

  const currency = plans?.currency ? plans.currency : "usd";
  const bundles = plans && Array.isArray(plans.bundles) ? plans.bundles : [];
  const recent = sortPaymentsNewest(usage?.payment_history).slice(0, 5);
  let plansHtml = "";
  if (!bundles.length) {
    plansHtml = `<p class="solspaceai-muted">${esc(T("Failed to reach SolspaceAI plans service."))}</p>`;
  } else {
    plansHtml = '<div class="solspaceai-plan-grid">';
    bundles.forEach((b) => {
      const name = `${b.name || b.label || b.key || ""}`.trim() || T("Credit plan");
      const desc = `${b.description || ""}`.trim() || T("Credit package for SolspaceAI usage.");
      const price = formatBundlePrice(b.price, b.currency || currency);
      const creds = b.credits != null ? fmtNum(b.credits) : "—";
      plansHtml += `<div class="solspaceai-plan-card" data-bundle-key="${esc(b.key)}">
                <span class="solspaceai-plan-name">${esc(name)}</span>
                <p class="solspaceai-plan-desc">${esc(desc)}</p>
                <div class="solspaceai-plan-price">${esc(price)}</div>
                <div class="solspaceai-plan-credits"><strong>${esc(creds)}</strong> ${esc(T("credits"))}</div>
                <button type="button" class="solspaceai-plan-buy" data-bundle-key="${esc(b.key)}">${esc(T("Buy now"))}</button>
            </div>`;
    });
    plansHtml += "</div>";
  }
  let payRows = "";
  if (!recent.length) {
    payRows = `<p class="solspaceai-muted">${esc(T("No purchases yet."))}</p>`;
  } else {
    payRows = `<table class="solspaceai-metrics-table"><thead><tr>
            <th>${esc(T("Date"))}</th><th>${esc(T("Amount"))}</th><th>${esc(T("Credits"))}</th>
        </tr></thead><tbody>`;
    recent.forEach((entry) => {
      payRows += formatPaymentRow(entry, currency);
    });
    payRows += "</tbody></table>";
  }
  const modalHtml = `<div class="modal fitted solspaceai-plans-modal">
        <div class="header">
            <h2 style="margin:0;font-size:18px;font-weight:600;">${esc(T("Purchase SolspaceAI Credits"))}</h2>
        </div>
        <div class="body">
            <div class="solspaceai-plans-body">
                ${plansHtml}
                <div class="solspaceai-pay-section">
                    <h3 class="solspaceai-pay-heading">${esc(T("Recent Payments"))}</h3>
                    <p class="solspaceai-section-desc solspaceai-pay-desc">${esc(T("Your recent SolspaceAI credit purchase history."))}</p>
                    ${payRows}
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="buttons right">
                <button type="button" class="btn cancel" data-solspaceai-close>${esc(Ta("Close"))}</button>
            </div>
        </div>
    </div>`;
  const $raw = $(modalHtml.trim());
  const $modal = $raw
    .filter(".solspaceai-plans-modal")
    .add($raw.find(".solspaceai-plans-modal"))
    .first();
  if (!$modal.length) {
    Craft.cp.displayError(T("Could not open purchase dialog."));
    return;
  }
  const $modalHost = $("#modals");
  ($modalHost.length ? $modalHost : $("body")).append($modal);
  const modal = new Garnish.Modal($modal, {
    closeOnEsc: true,
    hideOnEsc: true,
    hideOnShadeClick: true,
    resizable: false,
    onHide: () => $modal.remove(),
  });
  $modal.data("modal", modal);
  $modal.on("click", "[data-solspaceai-close]", () => modal.hide());
  $modal.on("click", ".solspaceai-plan-buy", (ev) => {
    const btn = ev.currentTarget;
    const key = btn.getAttribute("data-bundle-key");
    if (!key) return;
    btn.disabled = true;
    const prev = btn.textContent;
    btn.textContent = T("Loading…");
    Craft.sendActionRequest("POST", "calendar/solspace-ai/create-checkout-session", {
      data: {
        bundle_key: key,
        success_url: window.location.href,
        cancel_url: window.location.href,
        currency,
      },
    })
      .then((resp) => {
        btn.disabled = false;
        btn.textContent = prev;
        const data = resp.data || {};
        if (data.url) {
          window.location.href = data.url;
          return;
        }
        Craft.cp.displayError(T("Failed to create checkout session."));
      })
      .catch(() => {
        btn.disabled = false;
        btn.textContent = prev;
        Craft.cp.displayError(T("Failed to create checkout session."));
      });
  });
}

function updateEmptyState(usage) {
  const dm = Array.isArray(usage.daily_metrics) ? usage.daily_metrics.length : 0;
  const rl = Array.isArray(usage.request_logs) ? usage.request_logs.length : 0;
  const empty = document.getElementById("solspaceai-empty");
  if (!empty) return;
  show(empty, dm === 0 && rl === 0);
}

function loadDashboard() {
  Promise.all([
    Craft.sendActionRequest("GET", "calendar/solspace-ai/usage"),
    Craft.sendActionRequest("GET", "calendar/solspace-ai/plans"),
  ])
    .then((res) => {
      const usage = res[0]?.data ? res[0].data : null;
      const plans = res[1]?.data ? res[1].data : null;
      const loading = document.getElementById("solspaceai-loading");
      const main = document.getElementById("solspaceai-main");
      const err = document.getElementById("solspaceai-error");
      show(loading, false);
      if (usage && usage.success === false) {
        show(err, true);
        setText("solspaceai-error-msg", usage.error || T("Failed to load usage."));
        return;
      }
      show(main, true);
      const u = usage || {};
      renderCards(u, plans || {});
      renderChart(Array.isArray(u.daily_metrics) ? u.daily_metrics : []);
      renderLogs(u);
      updateEmptyState(u);
    })
    .catch(() => {
      show(document.getElementById("solspaceai-loading"), false);
      show(document.getElementById("solspaceai-error"), true);
      setText(
        "solspaceai-error-msg",
        `${T("Error loading usage")} — ${T("Failed to load usage data.")}`,
      );
    });
}

function initSolspaceAiSettingsForm() {
  const root = document.getElementById("solspaceai-settings");
  if (!root || root.dataset.solspaceaiFormInit === "1") return;
  root.dataset.solspaceaiFormInit = "1";

  const form = document.getElementById("main-form");
  if (!form) return;

  const enabledField = document.getElementById("solspaceAiEnabled");
  const toggleField = document.getElementById("solspaceAiToggle");
  const authorizeField = document.getElementById("solspaceAiAuthorize");
  const reconnectField = document.getElementById("solspaceAiForceReconnect");
  const emailInput = document.getElementById("solspaceAiContactEmail");
  const siteUrlInput = document.getElementById("solspaceAiSiteUrl");
  const updateActions = document.getElementById("solspaceai-update-actions");
  const updateHint = document.getElementById("solspaceai-update-hint");
  const settingsPanel = document.getElementById("solspaceai-settings-panel");
  const actionButtons = root.querySelectorAll("[data-solspaceai-action]");

  const initialEmail = (root.dataset.initialEmail || "").trim();
  const initialSiteUrl = (root.dataset.initialSiteUrl || "").trim();
  const isConnected = root.dataset.connected === "1";
  const isEnabled = root.dataset.enabled === "1";

  const busyLabels = {
    enable: T("Connecting…"),
    disable: T("Disabling…"),
    authorize: T("Authorizing…"),
    reconnect: T("Reconnecting…"),
    update: T("Updating…"),
  };

  const currentEmail = () => (emailInput ? emailInput.value.trim() : "");
  const currentSiteUrl = () => (siteUrlInput ? siteUrlInput.value.trim() : "");
  const emailChanged = () => currentEmail() !== initialEmail;
  const siteUrlChanged = () => currentSiteUrl() !== initialSiteUrl;
  const isDirty = () => emailChanged() || siteUrlChanged();

  const syncUpdateUi = () => {
    if (!updateActions || !isEnabled) return;

    const dirty = isDirty();
    updateActions.classList.toggle("solspaceai-hidden", !dirty);

    if (updateHint) {
      if (dirty && isConnected && siteUrlChanged()) {
        updateHint.textContent = T("Site URL changed — Update will save and reconnect SolspaceAI.");
      } else if (dirty) {
        updateHint.textContent = T("You have unsaved connection changes.");
      } else {
        updateHint.textContent = "";
      }
    }

    if (dirty && settingsPanel && !settingsPanel.open) {
      settingsPanel.open = true;
    }
  };

  if (emailInput) emailInput.addEventListener("input", syncUpdateUi);
  if (siteUrlInput) siteUrlInput.addEventListener("input", syncUpdateUi);
  syncUpdateUi();

  const resetActionFields = () => {
    if (toggleField) toggleField.value = "";
    if (authorizeField) authorizeField.value = "";
    if (reconnectField) reconnectField.value = "";
  };

  const validateConnectionFields = () => {
    if (!currentEmail() || !currentSiteUrl()) {
      Craft.cp.displayError(T("Contact email and site URL are required."));
      if (settingsPanel) settingsPanel.open = true;
      emailInput?.focus();
      return false;
    }
    return true;
  };

  actionButtons.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      if (root.dataset.solspaceaiBusy === "1") return;

      const action = btn.getAttribute("data-solspaceai-action");
      if (!action) return;

      resetActionFields();

      if (action === "enable") {
        if (!validateConnectionFields()) return;
        if (enabledField) enabledField.value = "1";
        if (toggleField) toggleField.value = "enable";
        // Enable also authorizes so users don't need a second click.
        if (authorizeField) authorizeField.value = "1";
      } else if (action === "disable") {
        if (enabledField) enabledField.value = "";
        if (toggleField) toggleField.value = "disable";
      } else if (action === "authorize") {
        if (!validateConnectionFields()) return;
        if (authorizeField) authorizeField.value = "1";
      } else if (action === "reconnect") {
        if (!validateConnectionFields()) return;
        if (reconnectField) reconnectField.value = "1";
      } else if (action === "update") {
        if (!validateConnectionFields()) return;
        // Keep current enabled state; reconnect if site URL changed while connected.
        if (isConnected && siteUrlChanged() && reconnectField) {
          reconnectField.value = "1";
        }
      } else {
        return;
      }

      root.dataset.solspaceaiBusy = "1";
      btn.dataset.originalLabel = btn.textContent || "";
      btn.textContent = busyLabels[action] || T("Loading…");
      btn.classList.add("is-busy");
      btn.setAttribute("aria-busy", "true");

      actionButtons.forEach((other) => {
        if (other !== btn) other.classList.add("disabled");
      });

      if (typeof form.requestSubmit === "function") {
        form.requestSubmit();
      } else {
        form.submit();
      }
    });
  });
}

function initSolspaceAiDashboard() {
  initSolspaceAiSettingsForm();

  const root = document.getElementById("solspaceai-root");
  if (!root || root.dataset.solspaceaiInit === "1") return;
  root.dataset.solspaceaiInit = "1";
  loadDashboard();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSolspaceAiDashboard);
} else {
  initSolspaceAiDashboard();
}
