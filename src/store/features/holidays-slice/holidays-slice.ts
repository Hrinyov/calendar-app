import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HolidaysState } from "./holidays.types";
import { fetchHolidays } from "./holidays-thunks";


const initialState: HolidaysState = {};

export const HolidaysSlice = createSlice({
  name: "holidays",
  initialState,
  reducers: {
    addHolidays: (state, action: PayloadAction<HolidaysState>) => {
      Object.assign(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchHolidays.fulfilled,
      (_, action: PayloadAction<HolidaysState>) => {
        return action.payload;
      }
    );
  },
});

export const { addHolidays } = HolidaysSlice.actions;

export default HolidaysSlice.reducer;
