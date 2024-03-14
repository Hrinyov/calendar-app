import { FC } from "react";
import styled from "styled-components";
import { HolidayProps } from "./holiday.types";

const HolidayWrapper = styled.div`
  background-color: #f9af2fcb;
  color: white;
  padding: 4px 8px;
  margin: 4px 0;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  font-size: 18px;
  text-align: center;
  justify-content: space-between;
`;

export const Holiday: FC<HolidayProps> = ({ name }) => {
  return (
    <HolidayWrapper>
      Holiday: <strong>{name}</strong>
    </HolidayWrapper>
  );
};
