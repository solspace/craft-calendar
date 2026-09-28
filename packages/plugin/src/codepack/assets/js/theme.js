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
    var toggle = document.querySelector('[data-theme-toggle]');
    if (!toggle) return;

    var label = selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1);
    toggle.setAttribute('aria-label', 'Theme: ' + label);
    toggle.querySelector('[data-theme-label]').textContent = label;

    document.querySelectorAll('[data-theme-value]').forEach(function (button) {
      var active = button.getAttribute('data-theme-value') === selectedTheme;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
      button.querySelector('.fa-check').classList.toggle('d-none', !active);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    updateControls();
    document.querySelectorAll('[data-theme-value]').forEach(function (button) {
      button.addEventListener('click', function () {
        selectedTheme = button.getAttribute('data-theme-value');
        try {
          window.localStorage.setItem(storageKey, selectedTheme);
        } catch (error) {
          // Theme switching still works without storage.
        }
        applyTheme();
        updateControls();
      });
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
