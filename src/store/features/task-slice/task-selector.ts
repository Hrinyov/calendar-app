import { Task } from "./task-slice.types";
import { TasksState } from "./task-slice.types";

export const selectTasksForDay = (tasks: TasksState, date: Date): Task[] => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dateKey = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;

  return tasks[dateKey] || [];
};

