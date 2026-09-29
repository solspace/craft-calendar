(function () {
  'use strict';

  const assetBase = document.currentScript.dataset.assetsBase;
  const storageKey = 'calendar-demo-framework';
  const requested = new URLSearchParams(window.location.search).get('framework');
  let saved;
  try { saved = window.localStorage.getItem(storageKey); } catch { /* Storage is optional. */ }
  const framework = ['tailwind', 'bootstrap'].includes(requested)
    ? requested
    : (saved === 'bootstrap' ? 'bootstrap' : 'tailwind');

  try { window.localStorage.setItem(storageKey, framework); } catch { /* Storage is optional. */ }
  document.documentElement.dataset.framework = framework;
  window.calendarDemoFramework = framework;

  function stylesheet(href, integrity) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    if (integrity) {
      link.integrity = integrity;
      link.crossOrigin = 'anonymous';
    }
    document.head.append(link);
  }

  if (framework === 'bootstrap') {
    stylesheet('https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css', 'sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB');
    stylesheet(assetBase + 'css/bootstrap.css');
    window.calendarDemoBootstrapReady = new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js';
      script.integrity = 'sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI';
      script.crossOrigin = 'anonymous';
      script.onload = resolve;
      script.onerror = resolve;
      document.head.append(script);
    });
  } else {
    stylesheet(assetBase + 'css/tailwind.css');
  }

  document.addEventListener('DOMContentLoaded', () => {
    const select = document.querySelector('[data-framework-select]');
    if (!select) return;
    select.value = framework;
    select.addEventListener('change', () => {
      try { window.localStorage.setItem(storageKey, select.value); } catch { /* Storage is optional. */ }
      // Reload so each framework loads only its own stylesheet and behavior.
      const url = new URL(window.location.href);
      url.searchParams.set('framework', select.value);
      window.location.assign(url);
    });
  });
}());
