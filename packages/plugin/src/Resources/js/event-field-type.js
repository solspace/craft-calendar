document.addEventListener('DOMContentLoaded', () => {
  const fieldSelector = '[data-type="Solspace\\\\Calendar\\\\FieldTypes\\\\EventFieldType"]';

  const updateActions = () => {
    const field = document.querySelector(fieldSelector);
    if (!field) return;

    const chips = field.querySelectorAll('.chip-actions');
    chips.forEach(chip => {
      const buttons = chip.querySelectorAll('button.hidden');
      buttons.forEach(btn => btn.classList.remove('hidden'));
    });
  };

  const observer = new MutationObserver(() => updateActions());
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  const init = () => updateActions();
  init();
});
