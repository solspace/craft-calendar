import { createSlice } from '@reduxjs/toolkit';

const repeats = createSlice({
  name: 'repeats',
  initialState: false,
  reducers: {
    toggle: (state, action) => action.payload,
  },
});

export const { actions, reducer } = repeats;
export default reducer;
