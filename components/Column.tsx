import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";
import { Columns as ColumnType, Task } from "../lib/Types";

import toast, { Toaster } from "react-hot-toast";
import { MdDeleteForever } from "react-icons/md";
import { theme } from "@/lib/data";

type ColumnProps = {
  column: ColumnType;
  tasks: Task[];
  onTitleChange: (newTitle: string) => void;
  toggle: boolean;
};

export default function Column({
  column,
  tasks,
  onTitleChange,
  toggle,
}: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`min-w-72 w-full flex flex-col items-center rounded-xl select-none border-2 ${
        toggle == false
          ? `bg-[#fcf5e5] ${theme.BorderDark}`
          : `${theme.PrimaryColorDark} ${theme.BorderLight}`
      }`}
    >
      <Toaster />

      <div
        className={`w-full flex items-center justify-between px-2 rounded-t-xl uppercase font-mono font-extrabold ${
          toggle == false ? "bg-[#190d05]/[0.2]" : "bg-[#fcf5e5]/[0.2]"
        } mb-4`}
      >
        <button onClick={() => toast.success}>
          <MdDeleteForever
            color={toggle == false ? "black" : "white"}
            size={26}
            className="active:scale-[0.95]"
          />
        </button>
        <input
          value={column.title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="ADD COLUMN NAME"
          className={`outline-none min-w-24 bg-transparent uppercase text-center text-3xl ${
            toggle == false ? "text-[#190d05]" : "text-[#fcf5e5]"
          }`}
        />
        <button className="flex items-center justify-center active:scale-[0.9]">
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
