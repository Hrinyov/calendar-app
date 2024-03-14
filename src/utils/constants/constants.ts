import { nanoid } from "@reduxjs/toolkit";

export const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const COLORS = [
  "gray",
  "#e74c3c",
  "#3498db",
  "#50d35d",
  "#e5eb38",
  "orange",
  "#a743a7",
  "pink",
];

export const DUMMY_DATA = {
  "2024-03-15": [
    { id: nanoid(), title: "Finish the application", color: "#e74c3c" },
    { id: nanoid(), title: "Watch a movie", color: "#a743a7" },
    { id: nanoid(), title: "Relax", color: "#3498db" },
  ],
};
