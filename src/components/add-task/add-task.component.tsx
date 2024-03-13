import { FC, useState } from "react";
import styled, { css } from "styled-components";
import { useDispatch } from "react-redux";
import { addTask } from "../../store/features/task-slice/task-slice";
import { AddTaskProps, Task } from "./add-task.types";
import { nanoid } from "@reduxjs/toolkit";
import { COLORS } from "../../utils/constants/constants";

const AddTaskButton = styled.span`
  position: relative;
  cursor: pointer;
  font-size: 30px;
  display: inline-block;
  transition: transform 0.3s;
`;

const TaskForm = styled.form`
  display: flex;
  position: absolute;
  top: 50px;
  right: 10px;
  background-color: white;
  border-radius: 8px;
  flex-direction: column;
  gap: 8px;
  padding: 10px;
  z-index: 10;
`;

const Input = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const ColorSelection = styled.div`
  display: flex;
  gap: 8px;
`;

const ColorSquare = styled.div<{ selected: boolean; color: string }>`
  width: 30px;
  height: 30px;
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

const SubmitButton = styled.button`
  padding: 8px;
  background-color: gray;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: darkgray;
  }

  ${({ disabled }) =>
    disabled &&
    css`
      background-color: #ccc;
      color: #666;
      cursor: not-allowed;
      border: 1px solid #999;

      &:hover {
        background-color: #ccc;
      }
    `}
`;

export const AddTask: FC<AddTaskProps> = ({ dayKey }) => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [selectedColor, setSelectedColor] = useState("gray");
  const dispatch = useDispatch();

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  const resetForm = () => {
    setTitle("");
    setSelectedColor("gray");
    setShowForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: Task = {
      id: nanoid(),
      title,
      color: selectedColor,
    };
    dispatch(addTask({ dayKey, task: newTask }));
    resetForm();
  };

  const isSubmitDisabled = title.trim().length === 0;

  return (
    <>
      <AddTaskButton
        onClick={handleToggleForm}
        style={{ transform: showForm ? "rotate(45deg)" : "rotate(0)" }}
      >
        +
      </AddTaskButton>
      {showForm && (
        <TaskForm onSubmit={handleSubmit}>
          <Input
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <ColorSelection>
            {COLORS.map((color) => (
              <ColorSquare
                key={color}
                color={color}
                selected={selectedColor === color}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </ColorSelection>
          <SubmitButton type="submit" disabled={isSubmitDisabled}>
            Add Task
          </SubmitButton>
        </TaskForm>
      )}
    </>
  );
};
