/**
 * Event index class
 */
Craft.EventIndex = Craft.BaseElementIndex.extend({
  buttonGroup: null,

  init: function (elementType, $container, settings) {
    this.on('selectSource', $.proxy(this, 'updateButton'));
    this.on('selectSite', $.proxy(this, 'updateButton'));
    this.base(elementType, $container, settings);
  },

  getDefaultSourceKey: function () {
    return this.base();
  },

  updateButton: function () {
    if (!this.$source) {
      return;
    }

    this.resetMenuButton();

    const currentSource = this.$source;
    const { id, name, handle, key } = currentSource.data();
    const isAllEventsSource = key === '*';

    const sources = this.getValidSources().filter((item) => item.id !== id);

    const buttonGroup = $('<div />', { class: 'btngroup submit' });

    let menu = this.createMenuList(sources);
    let label, href;
    let menuClass = 'btn submit';

    if (isAllEventsSource) {
      label = Craft.t('calendar', 'New Event');
      menuClass += ' menubtn';
    } else {
      label = Craft.t('calendar', 'New {calendar} Event', { calendar: name });
      menuClass += ' add icon';
      href = this.getSourceUrl(handle);
    }

    const menuButton = $('<a />', {
      class: menuClass,
      href,
      text: Craft.escapeHtml(label),
    }).appendTo(buttonGroup);

    menu.appendTo(buttonGroup);

    let menuTarget = menuButton;
    if (!isAllEventsSource && sources.length > 0) {
      menuTarget = $('<div />', { class: 'btn submit menubtn' }).insertBefore(menu);
    }

    new Garnish.MenuBtn(menuTarget);

    this.buttonGroup = buttonGroup;
    this.addButton(this.buttonGroup);
  },

  resetMenuButton() {
    if (this.buttonGroup) {
      this.buttonGroup.remove();
    }
  },

  createMenuList(sources) {
    const menu = $('<div />', { class: 'menu' });
    const list = $('<ul />').appendTo(menu);

    for (let i = 0; i < sources.length; i++) {
      const { name, handle, color } = sources[i];
      const listItem = $('<li />');

      $('<a />', {
        href: this.getSourceUrl(handle),
        text: Craft.escapeHtml(name),
      })
        .prepend($('<span />', { class: 'color-indicator' }).css({ backgroundColor: color }))
        .appendTo(listItem);

      listItem.appendTo(list);
    }

    return menu;
  },

  getValidSources() {
    const sources = this.$sources;
    const validSources = [];
    for (let i = 0; i < sources.length; i++) {
      const source = $(sources[i]);
      const { key, id, handle, name, color, sites = '' } = source.data();

      if (key === '*') continue;

      let siteMap = `${sites}`.split(',').map((item) => parseInt(item));

      // Disregard sources for sites that are not currently selected
      if (siteMap.indexOf(this.siteId) === -1) continue;

      validSources.push({ key, id, handle, name, color });
    }

    return validSources;
  },

  getSourceUrl(calendarHandle) {
    for (let i = 0; i < Craft.sites.length; i++) {
      const site = Craft.sites[i];

      if (site.id === this.siteId) {
        return Craft.getUrl(`calendar/events/new/${calendarHandle}/${site.handle}`);
      }
    }
  },
});

// Register it!
Craft.registerElementIndexClass('Solspace\\Calendar\\Elements\\Event', Craft.EventIndex);
