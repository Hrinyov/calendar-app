import { FC } from "react";
import styled from "styled-components";

const DaysHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-weight: bold;
  margin-bottom: 10px;
`;

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const Header: FC = () => {
  return (
    <DaysHeader>
      {daysOfWeek.map((dayName) => (
        <div key={dayName}>{dayName}</div>
      ))}
    </DaysHeader>
  );
};
