import { createSlice } from '@reduxjs/toolkit';
import { frequencies } from '@cal/event-builder/constants/rules';

const repeats = createSlice({
  name: 'freq',
  initialState: frequencies.daily,
  reducers: {
    change: (state, action) => action.payload,
  },
});

export const { actions, reducer } = repeats;
export default reducer;
