import { FC } from "react";
import styled from "styled-components";

interface TaskItemProps {
  id: string;
  title: string;
  color?: string;
}

const TaskCard = styled.div<{ color?: string }>`
  background-color: #f8f8f8;
  border-left: 10px solid ${({ color }) => color};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 5px 0;
  padding: 10px;
  border-radius: 4px;
  width: 90%;
  box-sizing: border-box;
`;

export const TaskItem: FC<TaskItemProps> = ({ title, color }) => {
  return <TaskCard color={color}>{title}</TaskCard>;
};
