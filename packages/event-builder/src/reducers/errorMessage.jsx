import { createSlice } from '@reduxjs/toolkit';

const errorMessage = createSlice({
  name: 'errorMessage',
  initialState: '',
  reducers: {
    set: (state, action) => action.payload,
  },
});

export const { actions, reducer } = errorMessage;
export default reducer;
