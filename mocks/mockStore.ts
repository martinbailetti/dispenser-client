import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "@/slices/customerSlice";
import configReducer from "@/slices/configSlice";
import prizeReducer from "@/slices/prizeSlice";
import itemsReducer from "@/slices/itemsSlice";
import appReducer from "@/slices/appSlice";
import devicesInWarningReducer from "@/slices/devicesInWarningSlice";

export const testStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      customerData: customerReducer,
      configData: configReducer,
      itemsData: itemsReducer,
      prizeData: prizeReducer,
      appData: appReducer,
      devicesInWarning: devicesInWarningReducer,
    },
    preloadedState: initialState,
  });
};
