import { createSlice } from '@reduxjs/toolkit';
import {
  setHours,
  setMinutes,
  setSeconds,
  setMilliseconds,
  addDays,
  addMinutes,
  isSameDay,
  isBefore,
  subMinutes,
  getHours,
  getMinutes,
} from 'date-fns';

import {
  getUnixTimeUTC,
  fromUnixTimeUTC,
  resetToDayEnd,
  resetTimestampToDayStart,
  resetTimestampToDayEnd,
  resetTimestampToCurrentTime,
} from '@cal/event-builder/utilities/date';

import {
  timeInterval,
  timeIntervalSeconds,
  eventDuration,
  eventDurationSeconds,
} from '@cal/event-builder/utilities/config';

import { targets } from '@cal/event-builder/actions/dates';
import { toggle as allDayToggle } from '@cal/event-builder/actions/allDay';
import { toggle as multiDayToggle } from '@cal/event-builder/actions/multiDay';

let date = setMilliseconds(setSeconds(setMinutes(new Date(), 0), 0), 0);
const start = getUnixTimeUTC(date);
date = resetToDayEnd(date);
const end = getUnixTimeUTC(date);

const dates = createSlice({
  name: 'dates',
  initialState: {
    start,
    end,
  },
  reducers: {
    change: (state, action) => {
      const { target, date = start, allDay, multiDay } = action.payload;
      const clone = {
        ...state,
        [target]: date,
      };

      if (target === targets.start) {
        let startDate = fromUnixTimeUTC(clone.start);
        let endDate;

        if (multiDay) {
          endDate = addDays(startDate, 1);

          if (allDay) {
            endDate = resetToDayEnd(endDate);
          }
        } else {
          if (allDay) {
            endDate = resetToDayEnd(startDate);
          } else {
            endDate = addMinutes(startDate, eventDuration);
          }
        }

        clone.end = getUnixTimeUTC(endDate);
      } else if (target === targets.end) {
        if (clone.start >= date) {
          clone.end = clone.start + eventDurationSeconds;
        }
      }

      return clone;
    },
    changeTime: (state, action) => {
      const { target, date, multiDay } = action.payload;
      const clone = {
        ...state,
        [target]: date,
      };

      const inputDate = fromUnixTimeUTC(date);
      const originalDate = fromUnixTimeUTC(state[target]);

      const hours = getHours(inputDate);
      const minutes = getMinutes(inputDate);

      let modifiedDate = setHours(setMinutes(originalDate, minutes), hours);

      if (target === targets.end) {
        const startDate = fromUnixTimeUTC(state.start);
        if (isBefore(subMinutes(modifiedDate, timeInterval), startDate)) {
          modifiedDate = addMinutes(startDate, timeInterval);
        }
      }

      if (target === targets.start) {
        let startDate = modifiedDate;
        let endDate;

        if (multiDay) {
          endDate = addDays(startDate, 1);
        } else {
          endDate = addMinutes(startDate, eventDuration);
        }

        clone.end = getUnixTimeUTC(endDate);
      }

      clone[target] = getUnixTimeUTC(modifiedDate);

      return clone;
    },
  },
  extraReducers: {
    [allDayToggle]: (state, action) => {
      const allDay = action.payload;

      if (allDay) {
        return {
          ...state,
          start: resetTimestampToDayStart(state.start),
          end: resetTimestampToDayEnd(state.end),
        };
      }

      const startWithCurrentTime = resetTimestampToCurrentTime(state.start);
      const endWithCurrentTime = resetTimestampToCurrentTime(state.end);

      return {
        ...state,
        start: startWithCurrentTime,
        end: endWithCurrentTime + eventDurationSeconds,
      };
    },
    [multiDayToggle]: (state, action) => {
      const isMultiDay = action.payload;

      if (!isMultiDay) {
        const { start, end } = state;

        let startDate = fromUnixTimeUTC(start);
        let endDate = fromUnixTimeUTC(end);

        endDate = setHours(setMinutes(startDate, endDate.getMinutes()), endDate.getHours());

        const resetEndTime = getUnixTimeUTC(endDate);
        const startTime = getUnixTimeUTC(startDate);

        if (resetEndTime < startTime + timeIntervalSeconds) {
          endDate = addMinutes(startDate, eventDuration);
        }

        while (!isSameDay(startDate, endDate)) {
          startDate = subMinutes(startDate, timeInterval);
          endDate = subMinutes(endDate, timeInterval);
        }

        return {
          ...state,
          start: getUnixTimeUTC(startDate),
          end: getUnixTimeUTC(endDate),
        };
      }

      return {
        ...state,
        end: getUnixTimeUTC(addDays(fromUnixTimeUTC(state.end), 1)),
      };
    },
  },
});

export const { actions, reducer } = dates;
export default reducer;
