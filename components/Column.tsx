import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";
import { Columns as ColumnType, Task } from "../lib/Types";

type ColumnProps = {
  column: ColumnType;
  tasks: Task[];
  onTitleChange: (newTitle: string) => void;
};

export default function Column({ column, tasks, onTitleChange }: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <div
      ref={setNodeRef}
      className="min-w-72 w-full flex flex-col items-center gap-6 rounded-xl bg-[#fcf5e5]/[0.8] select-none border-2"
    >
      <div className="relative w-full flex items-center justify-center rounded-t-xl text-3xl text-[#190d05] uppercase font-mono font-extrabold bg-neutral-400">
        <input
          value={column.title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="ADD COLUMN NAME"
          className="outline-none bg-transparent uppercase text-center"
        />
        <button className="absolute right-0 flex items-center justify-center active:scale-[0.9] mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="black"
            viewBox="0 0 24 24"
            strokeWidth="1"
            stroke="white"
            className="size-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
      </div>
      <div className="w-full flex flex-col gap-2 p-2">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} color={column.color} />
        ))}
      </div>
    </div>
  );
}
