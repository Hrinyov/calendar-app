import { FC } from "react";
import styled from "styled-components";
import { CalendarDayProps } from "./calendar-cell.types";
import { TaskList } from "../task-list/task-list.component";
import { transformDateToKey } from "../../utils/calendar-utils";
import { AddTask } from "../add-task/add-task.component";
import { useAppSelector } from "../../store/store";
import { Holiday } from "../holiday/holiday.component";

const DayCell = styled.div.withConfig({
  shouldForwardProp: (prop) => !["selected", "isSelectedMonth"].includes(prop),
})<{ selected: boolean; isSelectedMonth: boolean }>`
  border: 2px solid #a19d9d82;
  border-radius: 10px;
  min-height: 100px;
  min-width: 100px;
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 10px;
  position: relative;
  background-color: ${({ selected }) => (selected ? "#ffffffa5" : "#ffffff6f")};
  opacity: ${({ isSelectedMonth }) => (isSelectedMonth ? 1 : 0.5)};
`;

const DayHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderItem = styled.span`
  color: white;
  display: inline;
  font-weight: 700;
  font-size: large;
`;

export const CalendarDay: FC<CalendarDayProps> = ({
  date,
  isToday,
  isSelectedMonth,
}) => {
  const holidays = useAppSelector((state) => state.holidays);
  const dayKey = transformDateToKey(date);
  const holidayName = holidays[dayKey];

  return (
    <DayCell selected={isToday} isSelectedMonth={isSelectedMonth}>
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
