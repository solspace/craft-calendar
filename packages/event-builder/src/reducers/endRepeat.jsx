import { createSlice } from '@reduxjs/toolkit';
import { endRepeatTypes } from '@cal/event-builder/constants/rules';
import { resetTimestampToDayEnd } from '@cal/event-builder/utilities/date';
import { getUnixTime } from 'date-fns';
import { change as dateChange, targets } from '@cal/event-builder/actions/dates';

const currentDate = getUnixTime(new Date());

const repeats = createSlice({
  name: 'endRepeat',
  initialState: {
    type: endRepeatTypes.never,
    date: currentDate,
    count: 1,
  },
  reducers: {
    changeType: (state, action) => ({ ...state, type: action.payload }),
    changeDate: (state, action) => ({
      ...state,
      date: resetTimestampToDayEnd(action.payload),
    }),
    changeCount: (state, action) => {
      let count = parseInt(action.payload);
      if (!Number.isInteger(count)) {
        count = 1;
      }

      return { ...state, count };
    },
  },
  extraReducers: {
    [dateChange]: (state, action) => {
      const { target, date: eventStartDate } = action.payload;
      if (target !== targets.start) return state;

      const { date } = state;
      if (eventStartDate <= date) {
        return state;
      }

      return { ...state, date: resetTimestampToDayEnd(eventStartDate) };
    },
  },
});

export const { actions, reducer } = repeats;
export default reducer;
