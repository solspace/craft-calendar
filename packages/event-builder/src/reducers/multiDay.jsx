import { createSlice } from '@reduxjs/toolkit';
import { change as dateChange, targets } from '@cal/event-builder/actions/dates';
import { fromUnixTimeUTC } from '@cal/event-builder/utilities/date';
import { addMinutes, isSameDay } from 'date-fns';
import { eventDuration } from '@cal/event-builder/utilities/config';

const multiDay = createSlice({
  name: 'multiDay',
  initialState: false,
  reducers: {
    toggle: (state, action) => action.payload,
  },
  extraReducers: {
    [dateChange]: (state, action) => {
      const { target, date, allDay } = action.payload;

      if (state || allDay || target !== targets.start) {
        return state;
      }

      let startDate = fromUnixTimeUTC(date);
      let endDate = addMinutes(startDate, eventDuration);

      return !isSameDay(startDate, endDate);
    },
  },
});

export const { actions, reducer } = multiDay;
export default reducer;
