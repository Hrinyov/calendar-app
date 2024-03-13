import { FC } from "react";
import styled from "styled-components";
import { TaskListProps } from "./task-list.types";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { TaskItem } from "../task-item/task-item.component";
import { useAppSelector } from "../../store/store";

const List = styled.div`
  min-width: 150px;
  min-height: 200px;
  width: 100%;
`;

export const TaskList: FC<TaskListProps> = ({ arrayKey }) => {
  const tasks = useAppSelector((state) => state.tasks[arrayKey]);

  return (
    <Droppable droppableId={arrayKey}>
      {(provided) => (
        <List {...provided.droppableProps} ref={provided.innerRef}>
          {tasks?.map((task, index) => (
            <Draggable
              key={task.id}
              draggableId={task.id.toString()}
              index={index}
            >
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <TaskItem
                    id={task.id}
                    title={task.title}
                    color={task.color}
                    arrayKey={arrayKey}
                  />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </List>
      )}
    </Droppable>
  );
};
