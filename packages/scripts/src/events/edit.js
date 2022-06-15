let waitForJQueryTimeout = null;

/**
 * @param callback
 */
const waitForJQuery = callback => {
  if (window.jQuery || window.$) {
    if (callback) {
      callback();
    }

    clearTimeout(waitForJQueryTimeout);
  } else {
    waitForJQueryTimeout = setTimeout(() => waitForJQuery(callback), 50);
  }
};

/**
 * @param func
 * @param timeout
 */
const debounce = (func, timeout = 500) => {
  let timer = null;

  return (...args) => {
    clearTimeout(timer);

    timer = setTimeout(() => func.apply(this, args), timeout);
  };
};

// Some nice UI touches
const showHud = event => {
  event.preventDefault();

  new Garnish.HUD(event.target, event.target.title, {
    orientations: ['top', 'bottom', 'right', 'left']
  });
};

const showAutoSaveSpinner = () => $('.auto-save-spinner').show().show().one('click', showHud);

const hideAutoSaveSpinner = () => $('.auto-save-spinner').hide();

const showAutoSaveStatus = () => $('.auto-save-status').show().one('click', showHud);

const hideAutoSaveStatus = () => $('.auto-save-status').hide();

const disableForm = () => $('#main-form').find(':input, textarea').attr('disabled', true);

const enableForm = () => $('#main-form').find(':input, textarea').attr('disabled', false);

const addTabsEventListener = () => {
  $('#tabs a').on('click', function() {
    const self = $(this);

    // Sets the correct tab
    self.parent().siblings().find('.sel').removeClass('sel');
    self.addClass('sel');

    // Sets the correct tab pane
    $('#fields').find('.flex-fields').addClass('hidden');
    $('#fields').find('#' + self.attr('data-id')).removeClass('hidden');

    return false;
  });
};

const showSelectedTab = () => {
  // Set the correct tab again...
  const hashes = window.location.hash.substr(1).split('&').reduce(function(result, item) {
    const parts = item.split('=');

    result[parts[0]] = parts[1];

    return result;
  }, {});

  const tab = $(`a#tab-${Object.keys(hashes)[0]}`);

  if (tab.length) {
    tab.trigger('click');
  }
};

/**
 * Renders the latest field layout on the fly.
 * Used to toggle conditional fields.
 *
 * @param callback
 */
const renderFieldLayout = callback => {
  const form = $('#main-form');
  const type = 'POST';
  const url = '/admin/calendar/events/render-field-layout';
  const data = {
    eventId: form.find('input[name="eventId"]').val(),
    CRAFT_CSRF_TOKEN: form.find('input[name="CRAFT_CSRF_TOKEN"]').val()
  };

  /**
   * Handles the done response.
   *
   * @param response
   */
  const done = response => {
    if (response && response.hasOwnProperty('success') && response.hasOwnProperty('fieldsRendered') && response.hasOwnProperty('fieldsSelectors')) {
      if (! response.success) {
        console.error('renderFieldLayout failed');
      }

      // Inject form fields (also includes any conditional fields)
      $('#main-form #fields').html(response.fieldsRendered);

      /*Craft.appendHeadHtml(response.headHtml);
      Craft.appendBodyHtml(response.bodyHtml);

      if (Craft.broadcaster) {
        Craft.broadcaster.postMessage({
          pageId: Craft.pageId,
          event: 'saveEvent'
        });
      }*/

      if (callback) {
        callback(response.fieldsSelectors);
      }
    } else if (callback) {
      callback(false);
    }
  };

  /**
   * Handles the failed response.
   *
   * @param response
   */
  const fail = response => {
    console.error('renderFieldLayout failed', response);

    if (callback) {
      callback();
    }
  };

  $.ajax({ type, url, data })
    .done(done)
    .fail(fail);
};

/**
 * Adds event listenered used to trigger auto save functionality when a field changes
 *
 * @param fields
 */
const trackChanges = fields => {
  // Now loop over our event field layout fields
  const fieldsAdded = [];

  //console.log(fields);

  for (let i = 0; i < fields.length; i++) {
    // We don't want to add new onChange event listeners to light switch fields since Craft does this for us but we do need to know when its clicked.
    let fieldByLightSwitch = $(`#fields-${fields[i]}.lightswitch`);

    // The field exists, it IS a lightswitch and it hasn't been added already
    if (fieldByLightSwitch.length && fieldByLightSwitch.hasClass('lightswitch') && ! fieldsAdded.includes(fields[i])) {
      fieldByLightSwitch.one('change', shortDebouncedEvents);

      // Track injected field changes so we dont add this field multiple times.
      fieldsAdded.push(fields[i]);
    }

    // We don't want to add new event listeners to table fields since Craft does this for us but we do need to know when its clicked.
    let fieldByEditable = $(`#fields-${fields[i]}.editable`);

    // The field exists, it IS a lightswitch and it hasn't been added already
    if (fieldByEditable.length && fieldByEditable.hasClass('editable') && ! fieldsAdded.includes(fields[i])) {
      const id = "fields\u002D" + fields[i];
      const name = "fields\u005B" + fields[i] + "\u005D";

      // FIXME - Pull from DB
      const cols = {"col1":{"heading":"Column 1","handle":"column1","width":"","type":"singleline"},"col2":{"heading":"Column 2","handle":"column2","width":"","type":"singleline"}};

      new Craft.EditableTable(id, name, cols, {
        defaultValues: {},
        allowAdd: true,
        allowDelete: true,
        allowReorder: true,
        minRows: null,
        maxRows: null
      });

      // Track injected field changes so we dont add this field multiple times.
      fieldsAdded.push(fields[i]);
    }

    // We don't want to add new event listeners to color input fields since Craft does this for us but we do need to know when its clicked.
    let fieldByColorInput = $(`#fields-${fields[i]}.color-input`);

    // The field exists, it IS a lightswitch and it hasn't been added already
    if (fieldByColorInput.length && fieldByColorInput.hasClass('color-input') && ! fieldsAdded.includes(fields[i])) {
      //const c = new Craft.ColorInput(`#fields-${fields[i]}-container`);

      // Prune out any instances already included
      //const fieldId = "#fields-" + fields[i] + "-container";
      //const regexp = new RegExp(
      //  'new Craft.ColorInput(\'' + fieldId + '\');',
      //  'g'
      //);

      //let script = $('script').html();
      //script = script.replace(regexp, '');
      //console.log(script);

      //Garnish.$bod.append(html);

      //new Craft.ColorInput('#fields-testField7-container');
    }
  }

  // Now loop over all form fields
  addEventListeners();

  /**
   * This is the saving grace. Without this, our event listeners for injected light switch fields will not work.
   * Handling light switches injected into the page via Javascript is a little tricky since the DOM is unaware of them.
   * We also don't want to track the "handle" clicks or changes or even the inbetween state changes as this does nothing for auto save functionality.
   */
  Craft.initUiElements();
  
  // WIP fixes select inputs
  //new Craft.BaseElementSelectInput({"id":"fields-testField1","name":"fields[testField1]","elementType":"craft\\elements\\Entry","sources":"*","condition":{"elementType":"craft\\elements\\Entry","fieldContext":"global","class":"craft\\elements\\conditions\\entries\\EntryCondition","conditionRules":[]},"criteria":{"siteId":1},"allowSelfRelations":false,"sourceElementId":64,"disabledElementIds":[64],"viewMode":"list","single":false,"limit":null,"showSiteMenu":"auto","modalStorageKey":"field.1","fieldId":1,"sortable":true,"prevalidate":false,"modalSettings":{"defaultSiteId":1}});
};

/**
 * Adds event listeners to all form fields including those added by editable fields such as tables
 */
const addEventListeners = () => {
  $('#main-form').find(':input').each(function() {
    const type = $(this).attr('type');

    if (type == 'hidden' || type == 'submit') {
      // We dont want these to trigger autosaves
    } else if (type == 'button') {
      if ($(this).is('.btn, .dashed, .add, .icon')) {
        // Editable Table - Add Row - We dont want this to trigger an autosave
        $(this).one('click', addEventListeners);
      } else if ($(this).is('.delete, .icon')) {
        // Editable Table - Delete Row - We dont want these to trigger autosaves
        $(this).one('click', addEventListeners);
      } else if ($(this).hasClass('lightswitch')) {
        // Light Switch - We dont want these to trigger autosaves
      } else {
        $(this).one('click', debouncedEvents);
      }
    } else if (type == 'select' || type == 'radio' || type == 'checkbox') {
      $(this).one('change', debouncedEvents);
    } else if (type == 'color') {
      // Color Inputs - We dont want these to trigger autosaves
    } else if (type == 'time' || type == 'date' || type == 'datetime-local' || $(this).hasClass('datepicker-date') || $(this).hasClass('datepicker-time') || $(this).hasClass('hasDatepicker') || $(this).hasClass('ui-timepicker-input')) {
      $(this).one('change', longDebouncedEvents);
    } else {
      // Long so we defo make sure the user has finished typing
      $(this).one('keyup', longDebouncedEvents);
    }
  });
};

/**
 * Debounced event wrappers to trigger auto saving and render latest field layout and track changes again.
 */
const shortDebouncedEvents = debounce(event => {
  event.preventDefault();
  event.stopImmediatePropagation();

  reload();
});

const debouncedEvents = debounce(event => {
  event.preventDefault();
  event.stopImmediatePropagation();

  reload();
}, 500);

const longDebouncedEvents = debounce(event => {
  event.preventDefault();
  event.stopImmediatePropagation();

  reload();
}, 1000);

/**
 * Attemptes to auto save all valid form data.
 *
 * @param callback
 */
const autoSave = callback => {
  const form = $('#main-form');
  const url = form.attr('action');
  const type = form.attr('method');
  const data = form.serializeArray();
  const beforeSend = () => {
    disableForm();
    hideAutoSaveStatus();
    showAutoSaveSpinner();
  };

  /**
   * Handles the done response.
   *
   * @param response
   */
  const done = response => {
    if (response && response.hasOwnProperty('success') && response.success && callback) {
      callback();
    }
  };

  /**
   * Handles our failed response.
   *
   * @param response
   */
  const fail = response => console.error('autoSave failed', response);

  $.ajax({ type, url, data, beforeSend })
    .done(done)
    .fail(fail);
};

/**
 * Handles everything in-a-oner
 */
const reload = () => autoSave(() => {
  renderFieldLayout(fields => {
    enableForm();
    showSelectedTab();
    trackChanges(fields);
    hideAutoSaveSpinner();
    showAutoSaveStatus();
  });
});

/**
 * Kicks off event listeners once jquery has loaded.
 */
waitForJQuery(() => {
  addTabsEventListener();
  renderFieldLayout(fields => {
    showSelectedTab();
    trackChanges(fields);
  });
});
