$(function () {
  const $tabs = $('.layoutdesigner').find('.fld-tabs');
  const $descriptionSelect = $('#descriptionFieldHandle');
  const $locationSelect = $('#locationFieldHandle');
  let lastUsedFieldCount = null;

  setInterval(function () {
    const fieldsUsed = [];
    const fields = $('.fld-tab .fld-element[data-id]', $tabs);

    if (fields.length === lastUsedFieldCount) {
      return;
    }

    fields.each(function () {
      const id = parseInt($(this).data('id'));

      if (fieldsUsed.indexOf(id) === -1 && customFieldData[id]) {
        fieldsUsed.push(id);
      }
    });

    lastUsedFieldCount = fields.length;

    const descriptionVal = $descriptionSelect.val();
    const locationVal = $locationSelect.val();

    $descriptionSelect.find('option:gt(0)').remove();
    $locationSelect.find('option:gt(0)').remove();
    for (let i = 0; i < fieldsUsed.length; i++) {
      const handle = customFieldData[fieldsUsed[i]].handle;
      const name = customFieldData[fieldsUsed[i]].name;

      const $descriptionOption = $('<option>').html(name).attr('value', handle);
      const $locationOption = $descriptionOption.clone();

      if (handle === descriptionVal) {
        $descriptionOption.attr('selected', 'selected');
      }

      $descriptionSelect.append($descriptionOption);

      if (handle === locationVal) {
        $locationOption.attr('selected', 'selected');
      }

      $locationSelect.append($locationOption);
    }
  }, 1000);
});
