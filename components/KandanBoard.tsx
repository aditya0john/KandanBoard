"use client";

import React, { useState } from "react";
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

function KandanBoard() {
  const [COLUMNS, setColumns] = useState<Columns[]>([
    { id: "TODO", title: "ToDo", color: "#b66a36" },
    { id: "IN_PROGRESS", title: "In Progress", color: "#61d07b" },
    { id: "DONE", title: "Done", color: "#e2d66d" },
  ]);

  const INITIAL_TASKS: Task[] = [
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
  ];

  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [form, setForm] = useState(true);

  function getRandomPastelColor() {
    const r = Math.floor((Math.random() * 127) + 127);
    const g = Math.floor((Math.random() * 127) + 127);
    const b = Math.floor((Math.random() * 127) + 127);
    return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
  }

  const addNewColumn = () => {
    const newId = String(COLUMNS.length + 1); // Generate a unique ID
    const newColumn: Columns = {
      id: newId,
      title: "Enter Name",
      color: getRandomPastelColor(),
    };

    setColumns((prev) => [...prev, newColumn]);
  };

  const getTaskPos = (id: Number) =>
    tasks.findIndex((task) => Number(task.id) == id);

  const sensors = useSensors(useSensor(TouchSensor), useSensor(PointerSensor));

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

  return (
    <div className="h-screen w-screen bg-[#190d05]/[0.8] text-white flex flex-col items-center justify-center">
      <div className="text-[3rem] font-semibold text-[#fcf5e5]">
        Kandan Board
      </div>

      <div className="border-2 p-2 rounded-lg absolute left-2 top-2 flex flex-col gap-2 font-mono">
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

      <div className="h-full w-full flex items-center justify-center overflow-x-auto overflow-y-hidden">
        <div className="h-full w-full flex gap-10 p-10">
          <DndContext sensors={sensors} onDragEnd={handleDragEvent}>
            {COLUMNS.map((column) => (
              <Column
                key={column.id}
                column={column}
                tasks={tasks.filter((tasks) => tasks.status === column.id)}
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
            fill="white"
            viewBox="0 0 24 24"
            strokeWidth="1"
            stroke="black"
            className="size-12"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default KandanBoard;
