import { createSlice } from '@reduxjs/toolkit';
import { change as dateChange, targets } from '@cal/event-builder/actions/dates';
import { isNewEvent } from '@cal/event-builder/utilities/config';
import { getDate } from 'date-fns';
import { fromUnixTimeUTC } from '@cal/event-builder/utilities/date';

const byMonthDay = createSlice({
  name: 'byMonthDay',
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

      return [getDate(fromUnixTimeUTC(date))];
    },
  },
});

export const { actions, reducer } = byMonthDay;
export default reducer;
