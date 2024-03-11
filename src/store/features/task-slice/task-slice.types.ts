export interface Task {
  id: string;
  title: string;
  color?: string;
}

export interface TasksState {
  [date: string]: Task[];
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