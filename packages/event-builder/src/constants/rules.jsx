import { setDay, setMonth, format } from 'date-fns';
import { dateFnsLocale, firstDayOfWeek } from '@cal/event-builder/utilities/config';
import translate from '@cal/event-builder/utilities/translations';
import * as locales from 'date-fns/locale';

export const frequencies = {
  daily: 'DAILY',
  weekly: 'WEEKLY',
  monthly: 'MONTHLY',
  yearly: 'YEARLY',
  selectDates: 'SELECT_DATES',
};

export const endRepeatTypes = {
  never: 'never',
  until: 'until',
  after: 'after',
};

export const weekDayAbbreviations = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
export const weekDays = [];
for (let i = 0; i < 7; i++) {
  const day = (i + firstDayOfWeek) % 7;
  const date = setDay(new Date(), day);

  weekDays.push({
    value: weekDayAbbreviations[day],
    label: format(date, 'eee', { locale: locales[dateFnsLocale] }),
  });
}

export const monthOptions = [];
for (let i = 0; i < 12; i++) {
  const date = setMonth(new Date(), i);

  monthOptions.push({
    value: i + 1,
    label: format(date, 'MMM', { locale: locales[dateFnsLocale] }),
  });
}

export const byDayIntervalEnum = {
  each: 0,
  first: 1,
  second: 2,
  third: 3,
  fourth: 4,
  last: -1,
};

export const monthRepeatOptions = [
  { value: byDayIntervalEnum.each, label: translate('On the following days') },
  { value: byDayIntervalEnum.first, label: translate('On the First') },
  { value: byDayIntervalEnum.second, label: translate('On the Second') },
  { value: byDayIntervalEnum.third, label: translate('On the Third') },
  { value: byDayIntervalEnum.fourth, label: translate('On the Fourth') },
  { value: byDayIntervalEnum.last, label: translate('On the Last') },
];

export const monthDayOptions = Array.from({ length: 31 }, (value, key) => key + 1).map((day) => ({
  value: day,
  label: `${day}`,
}));

export const yearRepeatOptions = [
  { value: byDayIntervalEnum.each, label: translate('On the same day') },
  { value: byDayIntervalEnum.first, label: translate('On the First') },
  { value: byDayIntervalEnum.second, label: translate('On the Second') },
  { value: byDayIntervalEnum.third, label: translate('On the Third') },
  { value: byDayIntervalEnum.fourth, label: translate('On the Fourth') },
  { value: byDayIntervalEnum.last, label: translate('On the Last') },
];
