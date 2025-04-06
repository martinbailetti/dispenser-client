import { createSlice } from "@reduxjs/toolkit";

export const devicesInWarningSlice = createSlice({
  name: "warnings",
  initialState: [],
  reducers: {
    setDevicesInWarning: (state, action) => {
      return action.payload;
    },
  },
});
export const { setDevicesInWarning } = devicesInWarningSlice.actions;

export default devicesInWarningSlice.reducer;
