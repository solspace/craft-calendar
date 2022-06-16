import { isDate, startOfDay, compareAsc, setHours, setMinutes, setSeconds, fromUnixTime } from 'date-fns';

export const resetToDayStart = (date) => setHours(setMinutes(setSeconds(date, 0), 0), 0);

export const resetToDayEnd = (date) => setHours(setMinutes(setSeconds(date, 59), 59), 23);

export const resetToCurrentTime = (date) => {
  const currentDate = new Date();
  const hours = currentDate.getHours();

  return setHours(setMinutes(setSeconds(date, 0), 0), hours);
};

export const resetTimestampToDayStart = (timestamp) => getUnixTimeUTC(resetToDayStart(fromUnixTimeUTC(timestamp)));

export const resetTimestampToDayEnd = (timestamp) => getUnixTimeUTC(resetToDayEnd(fromUnixTimeUTC(timestamp)));

export const resetTimestampToCurrentTime = (timestamp) =>
  getUnixTimeUTC(resetToCurrentTime(fromUnixTimeUTC(timestamp)));

export const getUnixTimeUTC = (date) => {
  const utcDate = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds())
  );

  return utcDate.getTime() / 1000;
};

export const fromUnixTimeUTC = (timestamp) => {
  const date = fromUnixTime(timestamp);

  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );
};

export const compareDates = ({ dateOne, dateTwo }) => {
  // Make sure both dates are in the same format
  dateOne = (isDate(dateOne))
    ? resetToDayEnd(startOfDay(dateOne))
    : fromUnixTimeUTC(dateOne);

  dateTwo = (isDate(dateTwo))
    ? resetToDayEnd(startOfDay(dateTwo))
    : fromUnixTimeUTC(dateTwo);

  return compareAsc(dateOne, dateTwo);
};
