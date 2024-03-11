import { FC, useEffect } from "react";
import styled from "styled-components";
import { CalendarDay } from "../calendar-cell/calendar-cell.component";
import { generateCalendarDays, isToday } from "../../utils/calendarUtils";
import { useAppDispatch } from "../../store/store";
import { initDailyTaskArray } from "../../store/features/task-slice/task-slice";
import { Header } from "../calendar-grid-header/calendar-grid-header.component";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
`;

export const CalendarGrid: FC = () => {
  const dispatch = useAppDispatch();
  const currentDate = new Date();
  const days = generateCalendarDays(currentDate);

  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    dispatch(initDailyTaskArray({ year, month }));
  }, [currentDate, dispatch]);
  return (
    <>
      <Header />
      <Grid>
        {days.map((date) => {
          return (
            <CalendarDay
              key={date.toISOString()}
              date={date}
              today={isToday(date)}
            />
          );
        })}
      </Grid>
    </>
  );
};
