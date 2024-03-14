import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TasksState, AddTask, EditTask, DeleteTask, MoveTaskInArray, MoveTaskOutArray } from "./task-slice.types";
import { DUMMY_DATA } from "../../../utils/constants/constants";

const initialState: TasksState = DUMMY_DATA;

export const TasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    initDailyTaskArray: (
      state,
      action: PayloadAction<{ year: number; month: number }>
    ) => {
      const { year, month } = action.payload;
      const numberOfDays = new Date(year, month, 0).getDate();
      for (let day = 1; day <= numberOfDays; day++) {
        const dateKey = `${year}-${month.toString().padStart(2, "0")}-${day
          .toString()
          .padStart(2, "0")}`;
        if (!state[dateKey]) {
          state[dateKey] = [];
        }
      }
    },
    addTask: (state, action: PayloadAction<AddTask>) => {
      const { dayKey, task } = action.payload;
      state[dayKey] = [...state[dayKey], task];
    },
    editTask: (
      state,
      action: PayloadAction<EditTask>
    ) => {
      const { dayKey, editedTask } = action.payload;
      const taskIndex = state[dayKey].findIndex((task) => task.id === editedTask.id );
      console.log(taskIndex)
     if (taskIndex !== -1) {
       state[dayKey][taskIndex] = {
         ...state[dayKey][taskIndex],
         ...editedTask,
       };
     }
    },
    deleteTask: (state, action: PayloadAction<DeleteTask>) => {
     const { dayKey, deletedTaskId } = action.payload;
     const taskIndex = state[dayKey].findIndex(
      (task) => task.id === deletedTaskId
     );
     if (taskIndex === -1) return;
      state[dayKey].splice(taskIndex, 1);
    },
    moveTaskInArray: (state, action: PayloadAction<MoveTaskInArray>) => {
      const { taskId, sourceDate, destinationDate, destinationIndex } =
        action.payload;

      const taskIndex = state[sourceDate].findIndex(
        (task) => task.id === taskId
      );
      if (taskIndex === -1) return; 
      const [task] = state[sourceDate].splice(taskIndex, 1);

      if (!state[destinationDate]) {
        state[destinationDate] = [];
      }

      state[destinationDate].splice(destinationIndex, 0, task);
    },
    moveTaskOutArray: (state, action: PayloadAction<MoveTaskOutArray>) => {
      const { taskId, sourceDate, destinationDate } = action.payload;

      const taskIndex = state[sourceDate]?.findIndex(
        (task) => task.id === taskId
      );
      if (taskIndex !== -1) {
        const [task] = state[sourceDate].splice(taskIndex, 1);

        if (destinationDate) {
          if (!state[destinationDate]) {
            state[destinationDate] = [];
          }
          state[destinationDate].push(task);
        } else state[sourceDate].push(task);
      }
    },
  },
});

export const { initDailyTaskArray, addTask, editTask, deleteTask, moveTaskInArray, moveTaskOutArray } = TasksSlice.actions;

export default TasksSlice.reducer;
