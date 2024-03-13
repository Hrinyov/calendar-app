import { FC, useState } from "react";
import styled, { css } from "styled-components";
import { TaskItemProps } from "./task-item.types";
import { useDispatch } from "react-redux";
import {
  deleteTask,
  editTask,
} from "../../store/features/task-slice/task-slice";
import { Task } from "../../store/features/task-slice/task-slice.types";
import { COLORS } from "../../utils/constants/constants";

const TaskCard = styled.div<{ color?: string }>`
  background-color: #f8f8f8;
  color: black;
  border-left: 10px solid ${({ color }) => color || "#7b7777"};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 5px 0;
  padding: 8px;
  border-radius: 8px;
  width: 90%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  padding: 4px 8px;
  border-radius: 4px;
  border: none;
  background-color: lightgray;
  color: white;
  cursor: pointer;
`;

const Input = styled.input`
  padding: 4px;
  margin-right: 4px;
  border: 1px solid #ccc;
  width: 80%;
  border-radius: 4px;
`;

const ColorSelection = styled.div`
  display: flex;
  padding: 5px;
  background-color: white;
  border-radius: 5px;
  gap: 8px;
`;

const ColorSquare = styled.div<{ selected: boolean; color: string }>`
  width: 15px;
  height: 15px;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
  ${({ color }) =>
    css`
      background-color: ${color};
    `}
  ${({ selected }) =>
    selected &&
    css`
      border: 2px solid black;
    `}
`;

const DeleteButton = styled.button`
  padding: 4px 8px;
  margin-bottom: 15px;
  border-radius: 4px;
  border: none;
  background-color: #9b3636;
  color: white;
  cursor: pointer;
`;

export const TaskItem: FC<TaskItemProps> = ({ id, title, color, arrayKey }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedColor, setEditedColor] = useState(color);
  const [showEditButton, setShowEditButton] = useState(false);
  const dispatch = useDispatch();

  const handleSave = () => {
    const editedTask: Task = {
      id,
      title: editedTitle,
      color: editedColor,
    };
    dispatch(editTask({ dayKey: arrayKey, editedTask }));
    setIsEditing(false);
  };

  const handleDelete = () => {
    dispatch(deleteTask({ dayKey: arrayKey, deletedTaskId: id }));
  };

  const isSaveDisabled = title.trim().length === 0;

  return (
    <>
      <TaskCard
        color={color}
        onMouseEnter={() => setShowEditButton(true)}
        onMouseLeave={() => setShowEditButton(false)}
      >
        {isEditing ? (
          <>
            <Input
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <Button onClick={handleSave} disabled={isSaveDisabled}>
              Save
            </Button>
          </>
        ) : (
          <>
            {title}
            {showEditButton && (
              <Button onClick={() => setIsEditing(true)}>Edit</Button>
            )}
          </>
        )}
      </TaskCard>
      {isEditing && (
        <>
          <ColorSelection>
            {COLORS.map((color) => (
              <ColorSquare
                key={color}
                color={color}
                selected={editedColor === color}
                onClick={() => setEditedColor(color)}
              />
            ))}
          </ColorSelection>
          <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
        </>
      )}
    </>
  );
};
