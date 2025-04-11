import { useDraggable } from "@dnd-kit/core";
import { Task } from "../lib/Types";
import { useState } from "react";
import CreateTask from "./CreateTask";

type TaskCardProps = {
  classname?: string;
  toggle: boolean;
  task: Task;
  color: string;
  onTaskCreated: (task: Task) => void;
};

function TaskCard({
  task,
  color,
  toggle,
  classname,
  onTaskCreated,
}: TaskCardProps) {
  const [addTask, setAddTask] = useState(false);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <div className="flex">
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        aria-describedby={`DndDescribedBy-${task._id}`}
        className={`h-24 w-full rounded-l-lg bg-gray-500/[0.6] shadow-sm hover:shadow-md hover:scale-[1.02] transform duration-75 cursor-grab active:cursor-grabbing 
        ${classname}`}
        style={style}
      >
        <div
          className={`text-lg font-mono p-1 rounded-tl-lg capitalize flex items-center justify-between px-1`}
          style={{ backgroundColor: color }}
        >
          <span>{task.title}</span>

          <span
            className={`h-2 w-2 rounded-full ${
              task.priority === "LOW"
                ? "bg-yellow-300"
                : task.priority === "MEDIUM"
                ? "bg-teal-400"
                : "bg-red-600"
            }`}
          />
        </div>

        <div className="text-sm font-mono text-neutral-100 italic px-2">
          {" "}
          &middot; {task.description}
        </div>
        <div className="text-xs font-mono flex absolute bottom-1 right-0 mr-1">
          due - {task.dueDate}
        </div>
      </div>
      <span
        className={`${
          toggle === false ? "bg-[#190d05]/[0.2]" : "bg-[#fcf5e5]/[0.4]"
        } rounded-r-lg p-2`}
      >
        <span className="cursor-pointer" onClick={() => setAddTask(!addTask)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke={toggle === false ? "black" : "white"}
            className="size-6 active:scale-[0.95]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>

          {addTask && (
            <CreateTask
              toggle={toggle}
              taskDetails={task}
              cancelTask={(addTask) => setAddTask(addTask)}
              onTaskCreated={(task) => onTaskCreated(task)}
            />
          )}
        </span>
      </span>
    </div>
  );
}

export default TaskCard;
