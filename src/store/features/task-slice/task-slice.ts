import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TasksState, AddTask, EditTask, DeleteTask, MoveTaskInArray, MoveTaskOutArray } from "./task-slice.types";

const initialState: TasksState = {
  "2024-03-15": [
    { id: "task-1", title: "Task 1", color: "#e74c3c" },
    { id: "task-2", title: "Task 2", color: "#3498db" },
    { id: "task-3", title: "Task 3", color: "#3498db" },
  ],
};

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

      // Find and remove the task from the source date
      const taskIndex = state[sourceDate].findIndex(
        (task) => task.id === taskId
      );
      if (taskIndex === -1) return; // Task not found in source date
      const [task] = state[sourceDate].splice(taskIndex, 1);

      // If the destination date does not exist, initialize it
      if (!state[destinationDate]) {
        state[destinationDate] = [];
      }

      // Insert the task into the destination date at the specified index
      // This also handles reordering within the same date
      state[destinationDate].splice(destinationIndex, 0, task);
    },
    moveTaskOutArray: (state, action: PayloadAction<MoveTaskOutArray>) => {
      const { taskId, sourceDate, destinationDate } = action.payload;

      // Remove the task from the source date
      const taskIndex = state[sourceDate]?.findIndex(
        (task) => task.id === taskId
      );
      if (taskIndex !== -1) {
        const [task] = state[sourceDate].splice(taskIndex, 1);

        // If a destination date is provided, move the task there
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
