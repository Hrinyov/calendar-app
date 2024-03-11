import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CalendarState {
  currentDate: Date;
}

const initialState: CalendarState = {
  currentDate: new Date(), // Initializes to the current date, can be adjusted
};

export const CalendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    // Sets the current date, which can be used to adjust the viewed month/year
    setCurrentDate: (state, action: PayloadAction<Date>) => {
      state.currentDate = action.payload;
    },
    // Moves the current month viewed forward or backward
    adjustMonth: (state, action: PayloadAction<number>) => {
      // action.payload is expected to be 1 for next month or -1 for previous month
      const currentMonth = state.currentDate.getMonth();
      state.currentDate.setMonth(currentMonth + action.payload);
    },
    // Additional reducers can be added here for other calendar actions
  },
});

// Export actions for use in components
export const { setCurrentDate, adjustMonth } = CalendarSlice.actions;

// Export the reducer as default export
export default CalendarSlice.reducer;
