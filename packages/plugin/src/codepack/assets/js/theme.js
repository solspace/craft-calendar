(function () {
  'use strict';

  var storageKey = 'calendar-demo-theme';
  var modes = ['light', 'dark', 'auto'];
  var systemTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
  var selectedTheme = 'auto';

  try {
    var savedTheme = window.localStorage.getItem(storageKey);
    if (modes.indexOf(savedTheme) !== -1) selectedTheme = savedTheme;
  } catch (error) {
    // Storage may be unavailable in private browsing or restricted contexts.
  }

  function applyTheme() {
    var resolvedTheme = selectedTheme === 'auto'
      ? (systemTheme && systemTheme.matches ? 'dark' : 'light')
      : selectedTheme;

    document.documentElement.setAttribute('data-bs-theme', resolvedTheme);
    var themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.setAttribute('content', resolvedTheme === 'dark' ? '#212529' : '#ffffff');
  }

  applyTheme();

  function updateControls() {
    var select = document.querySelector('[data-theme-select]');
    if (select) select.value = selectedTheme;
  }

  document.addEventListener('DOMContentLoaded', function () {
    updateControls();
    var select = document.querySelector('[data-theme-select]');
    if (!select) return;

    select.addEventListener('change', function () {
      if (modes.indexOf(select.value) === -1) return;
      selectedTheme = select.value;
      try {
        window.localStorage.setItem(storageKey, selectedTheme);
      } catch (error) {
        // Theme switching still works without storage.
      }
      applyTheme();
    });
  });

  if (systemTheme) {
    var onSystemChange = function () {
      if (selectedTheme === 'auto') applyTheme();
    };
    if (systemTheme.addEventListener) systemTheme.addEventListener('change', onSystemChange);
    else if (systemTheme.addListener) systemTheme.addListener(onSystemChange);
  }
}());
