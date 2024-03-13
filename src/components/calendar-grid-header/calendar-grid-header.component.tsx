import { FC } from "react";
import styled from "styled-components";
import { DAYS_OF_WEEK, MONTH_NAMES } from "../../utils/constants/constants";

const DaysHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-weight: bold;
  margin-bottom: 10px;
`;
const Title = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 2rem;
`;

export const Header: FC = () => {
  const currentDate = new Date();
  const currentMonthName = MONTH_NAMES[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();
  return (
    <>
      <Title>{`${currentMonthName} ${currentYear}`}</Title>
      <DaysHeader>
        {DAYS_OF_WEEK.map((dayName) => (
          <div key={dayName}>{dayName}</div>
        ))}
      </DaysHeader>
    </>
  );
};
