import { configureStore } from "@reduxjs/toolkit";
import busSlice from "./slices/busSlice";
import authSlice from "./slices/authSlice";

import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: { busSlice, authSlice },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
