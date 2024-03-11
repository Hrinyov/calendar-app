import { FC } from "react";
import styled from "styled-components";
import { TaskList } from "../task-list/task-list.component";
import { transformDateToKey } from "../../utils/calendarUtils";

interface CalendarDayProps {
  date: Date;
  today: boolean;
}

const DayCell = styled.div<{ istoday: boolean }>`
  border: 2px solid #a19d9d82;
  min-height: 100px;
  min-width: 100px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: start;
  padding: 10px;
  position: relative;
  background-color: ${({ istoday }) => (istoday ? "#35b66288" : "#84a4b15f")};
  color: ${({ istoday }) => (istoday ? "white" : "black")};
`;

export const CalendarDay: FC<CalendarDayProps> = ({ date, today }) => {
    
  return (
    <DayCell istoday={today}>
      {date.getDate()}
      <TaskList arrayKey={transformDateToKey(date)} />
    </DayCell>
  );
};
