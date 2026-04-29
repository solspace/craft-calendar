import { createSlice } from "@reduxjs/toolkit";
import type { AppConfig } from "../types";
import type { RootState } from "./store";

const defaultState: AppConfig = {
  pro: false,
};

const appSlice = createSlice({
  name: "app",
  initialState: defaultState,
  reducers: {},
});

export const { actions: appActions } = appSlice;
export default appSlice.reducer;

export const appSelectors = {
  config: (state: RootState) => state.app,
  isPro: (state: RootState) => state.app.pro,
  formats: (state: RootState) => state.app.formats,
};
