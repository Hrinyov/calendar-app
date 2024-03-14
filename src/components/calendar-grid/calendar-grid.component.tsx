import { FC, useEffect } from "react";
import styled from "styled-components";
import { CalendarDay } from "../calendar-cell/calendar-cell.component";
import { generateCalendarDays, isToday } from "../../utils/calendarUtils";
import { fetchHolidays } from "../../store/features/holidays-slice/holidays-thunks";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  initDailyTaskArray,
  moveTaskOutArray,
  moveTaskInArray,
} from "../../store/features/task-slice/task-slice";
import { Header } from "../calendar-grid-header/calendar-grid-header.component";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
`;

export const CalendarGrid: FC = () => {
  const currentDateStr = useAppSelector((state) => state.calendar.currentDate);
  const currentDate = new Date(currentDateStr);
  const dispatch = useAppDispatch();
  const days = generateCalendarDays(currentDate);

  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    dispatch(initDailyTaskArray({ year, month }));
    dispatch(fetchHolidays({ year, countryCode: "US" }));
  }, [currentDate, dispatch]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId !== destination.droppableId) {
      dispatch(
        moveTaskOutArray({
          taskId: result.draggableId,
          sourceDate: source.droppableId,
          destinationDate: destination.droppableId,
        })
      );
    } else {
      dispatch(
        moveTaskInArray({
          taskId: result.draggableId,
          sourceDate: source.droppableId,
          destinationDate: destination.droppableId,
          destinationIndex: destination.index,
        })
      );
    }
  };
  return (
    <>
      <Header />
      <Grid>
        <DragDropContext onDragEnd={onDragEnd}>
          {days.map((date) => {
            return (
              <CalendarDay
                key={date.toISOString()}
                date={date}
                today={isToday(date)}
              />
            );
          })}
        </DragDropContext>
      </Grid>
    </>
  );
};
