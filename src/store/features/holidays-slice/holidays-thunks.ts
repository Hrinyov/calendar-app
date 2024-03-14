import { createAsyncThunk } from "@reduxjs/toolkit";
import { HolidaysState, FetchHolidaysArg, HolidayApiResponse } from "./holidays.types";

export const fetchHolidays = createAsyncThunk<HolidaysState, FetchHolidaysArg>(
  "holidays/fetchHolidays",
  async ({ year, countryCode }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch holidays");
      }
      const data: HolidayApiResponse[] = await response.json();

      const holidays = data.reduce((acc: HolidaysState, holiday) => {
        acc[holiday.date] = holiday.name;
        return acc;
      }, {});
      
      return holidays;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
