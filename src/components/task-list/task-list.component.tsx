import { FC } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { TaskItem } from "../task-item/task-item.component";
import { useAppDispatch, useAppSelector } from "../../store/store"; 
import { moveTaskInArray, moveTaskOutArray } from "../../store/features/task-slice/task-slice"; 

interface TaskListProps {
  arrayKey: string;
}

export const TaskList: FC<TaskListProps> = ({ arrayKey }) => {
  const tasks = useAppSelector((state) => state.tasks[arrayKey] || []);
  const dispatch = useAppDispatch();

  const onDragEnd = (result) => {
     if (!result.destination) {
       if (result.reason === "DROP") {
         dispatch(
           moveTaskOutArray({
             taskId: result.draggableId,
             sourceDate: arrayKey,
           })
         );
       }
       return;
     }
     const items = Array.from(tasks);
     const [reorderedItem] = items.splice(result.source.index, 1);
     items.splice(result.destination.index, 0, reorderedItem);
      if (result.destination.droppableId === "tasks") {
        dispatch(
          moveTaskInArray({
            taskId: reorderedItem.id,
            sourceDate: arrayKey,
            destinationDate: arrayKey,
            destinationIndex: result.destination.index,
          })
        );
      }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {tasks.map((task, index) => (
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
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
