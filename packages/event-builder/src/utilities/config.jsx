import * as locales from 'date-fns/locale';

const getLocale = (locale) => locale.replace(/[-_]*/gi, '');
const getLocaleShort = (locale) => getLocale(locale).replace(/^([a-z]{2}).*$/g, '$1');
const getDateFnsLocale = (locale) => {
  const fullLocale = getLocale(locale);
  const shortLocale = getLocaleShort(locale);

  if (locales[fullLocale]) {
    return fullLocale;
  }

  if (locales[shortLocale]) {
    return shortLocale;
  }

  return 'enUS';
};

export const { timeInterval, eventDuration, locale, firstDayOfWeek, isNewEvent, timeFormat, dateFormat } = eventConfig;
export const timeIntervalSeconds = timeInterval * 60;
export const eventDurationSeconds = eventDuration * 60;
export const dateFnsLocale = getDateFnsLocale(locale);
