import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "@/slices/customerSlice";
import configReducer from "@/slices/configSlice";
import itemsReducer from "@/slices/itemsSlice";
import prizeReducer from "@/slices/prizeSlice";
import appReducer from "@/slices/appSlice";
import devicesInWarningReducer from "@/slices/devicesInWarningSlice";
import { bridgeMiddleware } from "./bridgeMiddleware";

export const store = configureStore({
  reducer: {
    customerData: customerReducer,
    configData: configReducer,
    itemsData: itemsReducer,
    prizeData: prizeReducer,
    devicesInWarning: devicesInWarningReducer,
    appData: appReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(bridgeMiddleware),
});

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];
