import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { rootReducer } from "../rootReducer";
import { courseApi } from "../apis";

const store = configureStore({
  reducer: rootReducer,
  // middleware: getDefaultMiddleware({
  //   serializableCheck: false,
  // }),
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(courseApi.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
