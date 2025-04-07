"use client";

import React, { useEffect, useState } from "react";
import { Columns, Task } from "../lib/Types";
import Column from "./Column";

import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import { arrayMove } from "@dnd-kit/sortable";

import { CiCirclePlus } from "react-icons/ci";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { theme } from "@/lib/data";
import { useRouter } from "next/navigation";

function KandanBoard({ onLogOutSuccess }: { onLogOutSuccess: () => void }) {
  // const [COLUMNS, setColumns] = useState<Columns[]>([]);
  // const [TASKS, setTasks] = useState<Task[]>([]);
  const [toggle, setToggle] = useState(false);
  const router = useRouter();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const [columnsRes, tasksRes] = await Promise.all([
  //         axios.get("/api/columns"),
  //         axios.get("/api/tasks"),
  //       ]);

  //       setColumns(columnsRes.data || []);
  //       setTasks(tasksRes.data || []);
  //     } catch (err) {
  //       console.error("Error fetching columns/tasks", err);

  //       // Fallback to empty if error happens
  //       setColumns([]);
  //       setTasks([]);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const [COLUMNS, setColumns] = useState<Columns[]>([
    { id: "TODO", title: "To Do", color: "#b66a36" },
    { id: "IN_PROGRESS", title: "In Progress", color: "#61d07b" },
    { id: "DONE", title: "Done", color: "#e2d66d" },
  ]);

  const [TASKS, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Research Project",
      description: "This is my major project",
      status: "TODO",
      dueDate: "April",
      priority: "LOW",
    },
    {
      id: "2",
      title: "Design System",
      description: "This is the design to my suit",
      status: "TODO",
      dueDate: "April",
      priority: "MEDIUM",
    },
    {
      id: "3",
      title: "API intergration",
      description: "this is how i inject API's",
      status: "IN_PROGRESS",
      dueDate: "April",
      priority: "HIGH",
    },
    {
      id: "4",
      title: "Testing",
      description: "write unit test for testing",
      status: "DONE",
      dueDate: "April",
      priority: "NONE",
    },
  ]);

  const getTaskPos = (id: Number) =>
    TASKS.findIndex((task) => Number(task.id) == id);

  const sensors = useSensors(useSensor(TouchSensor), useSensor(PointerSensor));

  function getRandomPastelColor() {
    const r = Math.floor(Math.random() * 127 + 127);
    const g = Math.floor(Math.random() * 127 + 127);
    const b = Math.floor(Math.random() * 127 + 127);
    return `#${[r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("")}`;
  }

  const addNewColumn = async () => {
    const newCol = {
      title: "Untitled",
      color: getRandomPastelColor(),
      userId: "6605b0e7b3c61f0cba123456",
    };

    try {
      const res = await axios.post("/api/columns", newCol);
      setColumns((prev) => [...prev, res.data]);

      toast.success("NAME YOUR COLUMN NOW", {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#190d05",
        },
        iconTheme: {
          primary: "#713200",
          secondary: "#FFFAEE",
        },
      });
    } catch (err) {
      console.error("Error creating column", err);
      toast.error("Failed to create column");
    }
  };

  // const addNewColumn = () => {
  //   const newColumn: Columns = {
  //     id: String(COLUMNS.length + 1),
  //     title: "Enter Name",
  //     color: getRandomPastelColor(),
  //   };

  //   setColumns((prev) => [...prev, newColumn]);

  //   toast.success("NAME YOUR COLUMN NOW", {
  //     style: {
  //       border: "1px solid #713200",
  //       padding: "16px",
  //       color: "#190d05",
  //     },
  //     iconTheme: {
  //       primary: "#713200",
  //       secondary: "#FFFAEE",
  //     },
  //   });
  // };

  function handleDragEvent(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as Task["status"];

    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      );

      return arrayMove(
        updatedTasks,
        getTaskPos(Number(active.id)),
        getTaskPos(Number(over.id))
      );
    });
  }

  const logOut= async () =>{
    localStorage.removeItem("token");
    onLogOutSuccess();
  }

  return (
    <div
      className={`h-screen w-screen text-white flex flex-col items-center justify-center select-none transition duration-300
    ${toggle == false ? "bg-white" : "bg-[#190d05]"}`}
    >
      <Toaster position="top-center" reverseOrder={true} />

      <div
        className={`text-[3rem] font-semibold ${
          toggle == false ? theme.textLight : theme.textDark
        }`}
      >
        Kanban Board
      </div>

      <div className="hidden md:flex gap-4 absolute right-10 top-4">
        <button
        onClick={logOut}
          className={`bg-red-300 rounded-lg hover:rounded-full p-2 ${
            toggle == false ? "text-black" : "text-white"
          }`}
        >
          LOGOUT
        </button>
        <button
          onClick={() => setToggle(!toggle)}
          className={`border-2 rounded-full p-2 ${
            toggle == false ? "border-black" : "border-white"
          }`}
        >
          {toggle === true ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="white"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="black"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
              />
            </svg>
          )}
        </button>
      </div>

      <div
        className={`w-full lg:w-auto border-2 ${
          toggle == false ? `border-black ${theme.textLight}` : "border-white"
        } p-2 rounded-lg lg:absolute lg:left-10 lg:top-2 flex flex-col gap-2 font-mono`}
      >
        PRIORITY
        {Array(3)
          .fill(null)
          .map((_, i) => (
            <div
              key={i}
              className={`h-2 w-2 flex items-center justify-start rounded-full ${
                i === 0
                  ? "bg-yellow-300"
                  : i === 1
                  ? "bg-teal-400"
                  : "bg-red-600"
              }`}
            >
              <span className="ml-3">
                {i === 0 ? "Low" : i === 1 ? "Medium" : "High"}
              </span>
            </div>
          ))}
      </div>

      {COLUMNS.length === 0 && TASKS.length === 0 ? (
        <div>
          <button
            onClick={addNewColumn}
            className="flex items-center justify-center active:scale-[0.9] mr-2"
          >
            <CiCirclePlus
              color={toggle == false ? "black" : "white"}
              size={100}
              className="active:scale-[0.95]"
            />
          </button>
        </div>
      ) : (
        <div className="h-full w-full flex items-center justify-center overflow-x-auto overflow-y-hidden">
          <div className="h-full w-full flex gap-2 p-10">
            <DndContext sensors={sensors} onDragEnd={handleDragEvent}>
              {COLUMNS.map((column) => (
                <Column
                  key={column.id}
                  toggle={toggle}
                  column={column}
                  tasks={TASKS.filter((tasks) => tasks.status === column.id)}
                  onTitleChange={(newTitle) => {
                    setColumns((prev) =>
                      prev.map((col) =>
                        col.id === column.id ? { ...col, title: newTitle } : col
                      )
                    );
                  }}
                />
              ))}
            </DndContext>
          </div>

          <button
            onClick={addNewColumn}
            className="flex items-center justify-center active:scale-[0.9] mr-2 absolute right-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={toggle == false ? "black" : "white"}
              viewBox="0 0 24 24"
              strokeWidth="1"
              stroke={toggle == false ? "white" : "black"}
              className="size-16"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export default KandanBoard;
