import { createSlice } from '@reduxjs/toolkit';
import { change as dateChange, targets } from '@cal/event-builder/actions/dates';
import { isNewEvent } from '@cal/event-builder/utilities/config';
import { getMonth } from 'date-fns';
import { fromUnixTimeUTC } from '@cal/event-builder/utilities/date';

const byMonth = createSlice({
  name: 'byMonth',
  initialState: [new Date().getMonth() + 1],
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

      return [getMonth(fromUnixTimeUTC(date)) + 1];
    },
  },
});

export const { actions, reducer } = byMonth;
export default reducer;
