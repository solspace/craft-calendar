import { createSlice } from '@reduxjs/toolkit';
import { change as dateChange, targets } from '@cal/event-builder/actions/dates';
import { resetTimestampToDayStart } from '@cal/event-builder/utilities/date';

const selectDates = createSlice({
  name: 'selectDates',
  initialState: [],
  reducers: {
    add: (state, action) => (state.includes(action.payload) ? state : [...state, action.payload].sort((a, b) => a - b)),
    remove: (state, action) => state.filter((date) => date !== action.payload),
  },
  extraReducers: {
    [dateChange]: (state, action) => {
      let { target, date: eventStartDate } = action.payload;
      if (target !== targets.start) return state;

      eventStartDate = resetTimestampToDayStart(eventStartDate);

      return state.filter((date) => date >= eventStartDate);
    },
  },
});

export const { actions, reducer } = selectDates;
export default reducer;
