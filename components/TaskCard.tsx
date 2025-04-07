import { useDraggable } from "@dnd-kit/core";
import { Task } from "../lib/Types";

type TaskCardProps = {
  task: Task;
  color: string;
};

function TaskCard({ task, color }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      aria-describedby={`DndDescribedBy-${task.id}`}
      className={`h-24 w-full rounded-lg bg-gray-500/[0.6] shadow-sm hover:shadow-md hover:scale-[1.02] transform duration-75 cursor-grab active:cursor-grabbing 
        ${task.status === "DONE" ? " opacity-70 line-through" : ""}`}
      style={style}
    >
      <div
        className={`text-lg font-mono rounded-t-lg p-1 capitalize flex items-center justify-between px-1`}
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
      <div className="text-xs font-mono flex justify-end mr-1">
        due - {task.dueDate}
      </div>
    </div>
  );
}

export default TaskCard;
