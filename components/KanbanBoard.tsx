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

import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import UserButton from "./UserButton";
import PriorityChart from "./PriorityChart";

function KandanBoard({ onLogOutSuccess }: { onLogOutSuccess: () => void }) {
  const [COLUMNS, setColumns] = useState<Columns[]>([]);
  const [TASKS, setTasks] = useState<Task[]>([]);
  const [toggle, setToggle] = useState(false);
  const [del, setDel] = useState(false);
  const userName = localStorage.getItem("userName") || null;
  const userEmail = localStorage.getItem("userEmail") || null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [columnsRes, tasksRes] = await Promise.all([
          axios.get("/api/columns"),
          axios.get("/api/tasks"),
        ]);

        const userColumns = (columnsRes.data || []).filter(
          (col:Columns) => col.userId === localStorage.getItem("userId")
        );

        const columnIds = userColumns.map((col:Columns) => col._id);

        const userTasks = (tasksRes.data || []).filter((task:Task) =>
          columnIds.includes(task.columnId)
        );

        setColumns(userColumns);
        setTasks(userTasks);
      } catch (err) {
        console.error("Error fetching columns/tasks", err);
      }
    };

    fetchData();
  }, [del]);

  const getTaskPos = (id: Number) =>
    TASKS.findIndex((task) => Number(task._id) == id);

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
      userId: localStorage.getItem("userId"),
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
      toast.error(`Failed to create Column`, {
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
    }
  };

  function handleDragEvent(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;

    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task._id === taskId ? { ...task } : task
      );

      return arrayMove(
        updatedTasks,
        getTaskPos(Number(active.id)),
        getTaskPos(Number(over.id))
      );
    });
  }

  const logOut = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      localStorage.removeItem("userEmail");
      toast.success("LOGGED OUT");
      onLogOutSuccess();
    } catch (error) {
      toast.error("Failed to Logout");
    }
  };

  return (
    <div
      className={`h-screen w-screen text-white flex flex-col items-center justify-center select-none transition duration-300
    ${toggle == false ? "bg-white" : "bg-[#190d05]"}`}
    >
      <Toaster position="top-center" reverseOrder={true} />

      <div className="relative flex items-center justify-center h-[80px] w-full px-10">
        <span className="absolute left-4 lg:left-10 top-0">
          <PriorityChart toggle={toggle} />
        </span>

        <div
          className={`text-3xl lg:text-[5rem] font-semibold italic font-mono absolute top-6 ${
            toggle == false ? `text-[#190d05]/[0.8]` : `text-[#fcf5e5]/[0.8]`
          }`}
        >
          Kanban Board
        </div>

        <div className="flex lg:flex-row flex-col-reverse gap-4 text-xs absolute right-4 lg:right-10 top-6">
          <span className="flex flex-col-reverse lg:flex-row gap-2 justify-center items-center">
            <div>
              <UserButton userName={userName} userEmail={userEmail} />
            </div>

            <button
              onClick={logOut}
              className="bg-red-500 rounded-lg hover:rounded-full p-2"
            >
              LOGOUT
            </button>
          </span>

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
      </div>

      <div className="h-full w-full flex items-center justify-center">
        {COLUMNS.length === 0 && TASKS.length === 0 ? (
          <div>
            <button
              onClick={addNewColumn}
              className={`active:scale-[0.9] text-3xl flex flex-col items-center capitalize ${
                toggle === false ? "text-black" : "text-white"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={toggle == false ? "black" : "white"}
                viewBox="0 0 24 24"
                strokeWidth="1"
                stroke={toggle == false ? "white" : "black"}
                className="size-40"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <span>add your first column</span>
            </button>
          </div>
        ) : (
          <div className="h-full w-full flex items-center justify-center overflow-x-auto overflow-y-hidden">
            <div className="h-full w-full flex gap-2 p-10">
              <DndContext sensors={sensors} onDragEnd={handleDragEvent}>
                {COLUMNS.map((column) => (
                  <Column
                    key={column._id}
                    toggle={toggle}
                    column={column}
                    tasks={TASKS.filter(
                      (tasks) => tasks.columnId === column._id
                    )}
                    onDelete={(del) => setDel(del)}
                    onTaskCreated={(task) => {
                      setTasks((prev) => {
                        const exists = prev.find((t) => t._id === task._id);
                        return exists
                          ? prev.map((t) => (t._id === task._id ? task : t)) // update
                          : [...prev, task]; // add
                      });
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
    </div>
  );
}

export default KandanBoard;
