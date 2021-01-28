import { createSlice } from '@reduxjs/toolkit';
import { change as dateChange, targets } from '@cal/event-builder/actions/dates';
import { isNewEvent } from '@cal/event-builder/utilities/config';
import { weekDayAbbreviations } from '@cal/event-builder/constants/rules';
import { getDay } from 'date-fns';
import { fromUnixTimeUTC } from '@cal/event-builder/utilities/date';

const byDay = createSlice({
  name: 'byDay',
  initialState: [],
  reducers: {
    change: (state, action) =>
      state.includes(action.payload)
        ? state.filter((item) => item !== action.payload)
        : [...state, action.payload].sort((a, b) => a - b),
  },
  extraReducers: {
    [dateChange]: (state, action) => {
      const { target, date } = action.payload;
      if (!isNewEvent || target !== targets.start) return state;

      return [weekDayAbbreviations[getDay(fromUnixTimeUTC(date))]];
    },
  },
});

export const { actions, reducer } = byDay;
export default reducer;
