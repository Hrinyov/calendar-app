import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CalendarState } from "./calendar-slice.types";

const currentDateStr = new Date().toISOString();

const initialState: CalendarState = {
  currentDate: currentDateStr,
};

export const CalendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setCurrentDate: (state, action: PayloadAction<Date>) => {
      const newDate = action.payload;
      state.currentDate = newDate.toISOString();
    },
    adjustMonth: (state, action: PayloadAction<number>) => {
      const current = new Date(state.currentDate);
      const adjustedMonth = new Date(
        current.getFullYear(),
        current.getMonth() + action.payload,
        current.getDate()
      );

      state.currentDate = adjustedMonth.toISOString();
    },
  },
});

export const { setCurrentDate, adjustMonth } = CalendarSlice.actions;

export default CalendarSlice.reducer;
