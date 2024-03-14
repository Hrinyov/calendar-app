import { Task } from "../../store/features/task-slice/task-slice.types";

export interface TaskWithDate extends Task {
  date: string;
}

export type SearchResult = TaskWithDate[];