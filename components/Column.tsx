import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";
import { Columns as ColumnType, Task } from "../lib/Types";

import toast, { Toaster } from "react-hot-toast";
import { MdDeleteForever } from "react-icons/md";
import { theme } from "@/lib/data";
import axios from "axios";
import { useEffect, useState } from "react";
import CreateTask from "./CreateTask";

type ColumnProps = {
  column: ColumnType;
  tasks: Task[];
  toggle: boolean;
  onDelete: (del: boolean) => void;
  onTaskCreated: (task: Task) => void;
};

export default function Column({
  column,
  tasks,
  toggle,
  onDelete,
  onTaskCreated,
}: ColumnProps) {
  const [title, setTitle] = useState(column.title);
  const [addTask, setAddTask] = useState(false);
  const { setNodeRef } = useDroppable({
    id: column._id,
  });

  // Debounce: update the backend 6 seconds after typing stops
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (title !== column.title) {
        updateTitle(title);
      }
    }, 3000);

    return () => clearTimeout(timeout); // clear previous timer
  }, [title]);

  const updateTitle = async (newTitle: string) => {
    try {
      await axios.put(`/api/columns/${column._id}`, { title: newTitle });
      toast.success("Title updated");
    } catch (error) {
      console.error("Failed to update title", error);
      toast.error("Title update failed");
    }
  };

  const deleteColumn = () => {
    toast.custom((t) => (
      <div className="bg-white p-4 rounded shadow-lg border border-gray-300 flex flex-col gap-2">
        <span className="text-black/[0.6] italic">
          If you <b className="text-red-500">DELETE</b> the COLUMN, all the
          TASKS will also be deleted.
        </span>
        <div className="flex gap-3 justify-end mt-2">
          <button
            onClick={async () => {
              toast.dismiss(t.id); // close the toast
              try {
                console.log("Deleting column with ID:", column._id);
                await axios.delete(`/api/columns/${column._id}`);
                onDelete(true);
                toast.success("Column deleted");
              } catch (error) {
                toast.error("Failed to delete column");
                console.error("Failed to delete column", error);
              }
            }}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Delete
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="text-black border border-gray-300 px-3 py-1 rounded hover:bg-gray-200"
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div
      ref={setNodeRef}
      className={`min-w-72 w-full flex flex-col items-center rounded-xl select-none border-2 ${
        toggle == false
          ? `bg-[#fcf5e5] ${theme.BorderDark}`
          : `bg-gray-400/[0.2] ${theme.BorderLight}`
      }`}
    >
      <Toaster />

      {addTask && (
        <CreateTask
          colId={column._id}
          toggle={toggle}
          cancelTask={(addTask) => setAddTask(addTask)}
          onTaskCreated={(task) => onTaskCreated(task)}
        />
      )}
      <div
        className={`w-full flex items-center justify-between px-2 rounded-t-xl uppercase font-mono font-extrabold ${
          toggle == false ? "bg-[#190d05]/[0.2]" : "bg-[#fcf5e5]/[0.2]"
        } mb-4`}
      >
        <button onClick={deleteColumn}>
          <MdDeleteForever
            color={toggle == false ? "black" : "white"}
            size={26}
            className="active:scale-[0.95]"
          />
        </button>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="ADD COLUMN NAME"
          className={`outline-none min-w-24 bg-transparent uppercase text-center text-3xl ${
            toggle == false ? "text-[#190d05]/[0.8]" : "text-[#fcf5e5]"
          }`}
        />
        <button
          onClick={() => setAddTask(!addTask)}
          className="flex items-center justify-center active:scale-[0.9]"
        >
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
          <TaskCard
            toggle={toggle}
            key={task._id}
            task={task}
            color={column.color}
            onTaskCreated={(task) => onTaskCreated(task)}
            classname={`${
              column.title.toLocaleLowerCase() === "done"
                ? "opacity-70 line-through"
                : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
}
