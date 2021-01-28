import { createSlice } from '@reduxjs/toolkit';

const allDay = createSlice({
  name: 'allDay',
  initialState: true,
  reducers: {
    toggle: (state, action) => !!action.payload,
  },
});

export const { actions, reducer } = allDay;
export default reducer;
