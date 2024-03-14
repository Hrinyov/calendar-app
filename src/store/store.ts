import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import TasksSlice from "./features/task-slice/task-slice";
import CalendarSlice from "./features/calendar-slice/calendar-slice";
import HolidaysSlice from "./features/holidays-slice/holidays-slice";

export const store = configureStore({
  reducer: {
    tasks: TasksSlice,
    calendar: CalendarSlice,
    holidays: HolidaysSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
