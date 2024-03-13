import { AddTask } from "../../../components/add-task/add-task.component";

export interface Task {
  id: string;
  title: string;
  color: string;
}

export interface TasksState {
  [date: string]: Task[];
}

export interface  AddTask {
  dayKey: string;
  task: Task;
}

export interface EditTask {
  dayKey: string;
  editedTask: Task;
}

export interface DeleteTask {
  dayKey: string;
  deletedTaskId: string;
}

export interface MoveTaskInArray {
  taskId: string;
  sourceDate: string;
  destinationDate: string;
  destinationIndex: number;
}

export interface MoveTaskOutArray {
  taskId: string;
  sourceDate: string;
  destinationDate?: string;
}