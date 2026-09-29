(function () {
  'use strict';

  const storageKey = 'calendar-demo-framework';
  const requested = new URLSearchParams(window.location.search).get('framework');
  const framework = requested === 'bootstrap' ? 'bootstrap' : 'tailwind';
  let saved;
  try { saved = window.localStorage.getItem(storageKey); } catch { /* Storage is optional. */ }

  // The server chooses the markup and stylesheet from the query parameter.
  // Restore a prior Bootstrap choice before the Tailwind page is displayed.
  if (!requested && saved === 'bootstrap') {
    const url = new URL(window.location.href);
    url.searchParams.set('framework', 'bootstrap');
    window.location.replace(url);
    return;
  }
  try { window.localStorage.setItem(storageKey, framework); } catch { /* Storage is optional. */ }
  window.calendarDemoFramework = framework;
  document.documentElement.dataset.framework = framework;

  const scriptPath = new URL(document.currentScript.src).pathname;
  const assetMarker = '/assets/';
  const start = scriptPath.indexOf(assetMarker);
  const prefix = start === -1 ? 'demo' : scriptPath.slice(start + assetMarker.length).replace(/\/js\/framework\.js$/, '');
  const demoRoot = scriptPath.slice(0, start < 0 ? 0 : start) + '/' + prefix + '/';

  window.calendarDemoUrl = function (value) {
    const url = new URL(value, window.location.href);
    if (framework === 'bootstrap' && url.origin === window.location.origin && url.pathname.startsWith(demoRoot)) {
      url.searchParams.set('framework', 'bootstrap');
    }
    return url.toString();
  };

  document.addEventListener('DOMContentLoaded', function () {
    const select = document.querySelector('[data-framework-select]');
    if (select) {
      select.value = framework;
      select.addEventListener('change', function () {
        const url = new URL(window.location.href);
        url.searchParams.set('framework', select.value);
        window.location.assign(url);
      });
    }

    // Make regular links, keyboard activation, and open-in-new-tab retain the
    // chosen framework. Also handles content added later by the mini calendar.
    function decorate(root) {
      root.querySelectorAll('a[href]').forEach(function (link) {
        const url = new URL(link.href, window.location.href);
        if (url.origin === window.location.origin && url.pathname.startsWith(demoRoot) && framework === 'bootstrap') {
          link.href = window.calendarDemoUrl(url);
        }
      });
    }
    decorate(document);
    const observer = new MutationObserver(function (records) {
      records.forEach(function (record) {
        record.addedNodes.forEach(function (node) {
          if (node.nodeType === 1) {
            if (node.matches?.('a[href]')) node.href = window.calendarDemoUrl(node.href);
            decorate(node);
          }
        });
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
  });
}());
