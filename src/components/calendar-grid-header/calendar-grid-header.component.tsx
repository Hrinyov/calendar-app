import { FC } from "react";
import styled from "styled-components";
import { DAYS_OF_WEEK, MONTH_NAMES } from "../../utils/constants/constants";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { adjustMonth } from "../../store/features/calendar-slice/calendar-slice";

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

const NavButton = styled.button`
  background-color: #ffffff6a;
  color: #6a5c8a;
  border: none;
  padding: 10px;
  margin: 0 5px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #d4d4d4;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const Header: FC = () => {
  const currentDateStr = useAppSelector((state) => state.calendar.currentDate);
  const currentDate = new Date(currentDateStr);
  const dispatch = useAppDispatch();
  const currentMonthName = MONTH_NAMES[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();
  
   const handlePrevMonth = () => {
     dispatch(adjustMonth(-1));
   };

   const handleNextMonth = () => {
     dispatch(adjustMonth(1));
   };

  return (
    <>
      <HeaderContainer>
        <NavButton onClick={handlePrevMonth}>&lt;</NavButton>
        <Title>{`${currentMonthName} ${currentYear}`}</Title>
        <NavButton onClick={handleNextMonth}>&gt;</NavButton>
      </HeaderContainer>
      <DaysHeader>
        {DAYS_OF_WEEK.map((dayName) => (
          <div key={dayName}>{dayName}</div>
        ))}
      </DaysHeader>
    </>
  );
};
