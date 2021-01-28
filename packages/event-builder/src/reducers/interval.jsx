import { createSlice } from '@reduxjs/toolkit';

const interval = createSlice({
  name: 'interval',
  initialState: 1,
  reducers: {
    change: (state, action) => {
      const interval = parseInt(action.payload);
      if (isNaN(interval) || interval < 1) {
        return 1;
      }

      return interval;
    },
  },
});

export const { actions, reducer } = interval;
export default reducer;
