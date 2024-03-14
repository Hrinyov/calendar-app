import { FC } from "react";
import styled from "styled-components";
import { CalendarDayProps } from "./calendar-cell.types";
import { TaskList } from "../task-list/task-list.component";
import { transformDateToKey } from "../../utils/calendarUtils";
import { AddTask } from "../add-task/add-task.component";
import { useAppSelector } from "../../store/store";
import { Holiday } from "../holiday/holiday.component";

const DayCell = styled.div<{ istoday: boolean }>`
  border: 2px solid #a19d9d82;
  border-radius: 10px;
  min-height: 100px;
  min-width: 100px;
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 10px;
  position: relative;
  background-color: ${({ istoday }) => (istoday ? "#ffffffa5" : "#ffffff6f")};
`;

const DayHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderItem = styled.span`
  color: white;
  display:inline;
  font-weight: 700;
  font-size: large;
`;

export const CalendarDay: FC<CalendarDayProps> = ({ date, today }) => {
  const holidays= useAppSelector((state) => state.holidays);
  const dayKey = transformDateToKey(date);
  const holidayName = holidays[dayKey];
  return (
    <DayCell istoday={today}>
      <DayHeader>
        <HeaderItem>{date.getDate()}</HeaderItem>
        <HeaderItem>
          <AddTask dayKey={dayKey} />
        </HeaderItem>
      </DayHeader>
       {holidayName && <Holiday name={holidayName} />}
      <TaskList arrayKey={dayKey} />
    </DayCell>
  );
};
