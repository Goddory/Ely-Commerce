import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./features/uiSlice";
import dashboardReducer from "./features/dashboardSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      ui: uiReducer,
      dashboard: dashboardReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
