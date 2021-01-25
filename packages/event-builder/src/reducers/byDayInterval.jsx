import { createSlice } from '@reduxjs/toolkit';
import { byDayIntervalEnum } from '@cal/event-builder/constants/rules';

const byDayInterval = createSlice({
  name: 'byDayInterval',
  initialState: byDayIntervalEnum.each,
  reducers: {
    change: (state, action) => parseInt(action.payload),
  },
});

export const { actions, reducer } = byDayInterval;
export default reducer;
