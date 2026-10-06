(() => {
  const root = document.getElementById("calendar-diagnostics");
  if (!root) return;

  const report = document.getElementById("calendar-diagnostic-report");
  const serverReport = report.value;
  const translate = (message, params = {}) => Craft.t("calendar", message, params);
  const now = new Date();
  const offset = (date) => {
    const minutes = -date.getTimezoneOffset();
    return `UTC${minutes < 0 ? "-" : "+"}${String(Math.floor(Math.abs(minutes) / 60)).padStart(2, "0")}:${String(Math.abs(minutes) % 60).padStart(2, "0")}`;
  };
  const values = {
    timezone: translate("Unavailable"),
    offset: offset(now),
    clock: now.toLocaleString(document.documentElement.lang || undefined),
    language: navigator.language || translate("Unavailable"),
    dst: translate("January: {january}; July: {july}", {
      january: offset(new Date(now.getFullYear(), 0, 15, 12)),
      july: offset(new Date(now.getFullYear(), 6, 15, 12)),
    }),
  };
  try {
    values.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || values.timezone;
  } catch {
    // Browser timezone detection is optional; the server report is still available.
  }
  const browserReport = [translate("User / Browser")];
  for (const element of root.querySelectorAll("[data-browser-value]")) {
    element.textContent = values[element.dataset.browserValue];
    browserReport.push(`${element.closest("dd").previousElementSibling.textContent}: ${element.textContent}`);
  }
  report.value = `${serverReport}\n\n${browserReport.join("\n")}`;

  const copyButton = document.getElementById("calendar-copy-diagnostics");
  const copyLabel = copyButton.textContent;
  let resetCopyLabel;
  copyButton.addEventListener("click", async () => {
    const status = document.getElementById("calendar-diagnostic-copy-status");
    try {
      await navigator.clipboard.writeText(report.value);
      status.textContent = translate("Diagnostic report copied.");
      clearTimeout(resetCopyLabel);
      copyButton.textContent = translate("Copied!");
      resetCopyLabel = setTimeout(() => {
        copyButton.textContent = copyLabel;
      }, 3000);
    } catch {
      clearTimeout(resetCopyLabel);
      copyButton.textContent = copyLabel;
      root.querySelector(".calendar-diag-report").open = true;
      report.focus();
      report.select();
      status.textContent = translate("Copy the selected report using your keyboard.");
    }
  });
})();
