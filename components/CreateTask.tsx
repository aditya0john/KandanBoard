import { theme } from "@/lib/data";
import { Task } from "@/lib/Types";
import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

type createTaskProps = {
  taskDetails?: {
    _id: string;
    title: string;
    description: string;
    dueDate: string;
    priority?: string;
  } | null;
  colId?: string;
  toggle?: boolean;
  cancelTask: (addTask: boolean) => void;
  onTaskCreated: (task: Task) => void;
};

function CreateTask({
  taskDetails,
  toggle,
  colId,
  cancelTask,
  onTaskCreated,
}: createTaskProps) {
  const [details, setDetails] = useState({
    title: taskDetails?.title || "",
    description: taskDetails?.description || "",
    dueDate: taskDetails?.dueDate || "",
    priority: taskDetails?.priority || "LOW",
  });

  const handleSubmit = async () => {
    try {
      if (taskDetails) {
        const res = await axios.put(
          `/api/tasks/manage/${taskDetails._id}`,
          details
        );
        onTaskCreated(res.data); // You can rename this to onTaskUpdated if you prefer separating logic
        cancelTask(false);

        toast.success("TASK EDITIED", {
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
      } else {
        const res = await axios.post(`/api/tasks/create/${colId}`, details);
        onTaskCreated(res.data);
        cancelTask(false);

        toast.success("NEW TASK CREATED", {
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
    } catch (error) {
      console.error("❌ Failed to submit task:", error);
    }
  };

  return (
    <div>
      <Toaster />
      <div
        className={`z-50 h-screen w-screen flex items-center justify-center absolute top-0 left-0 backdrop-blur-sm ${
          toggle === false ? "bg-black/[0.5]" : "bg-white/[0.5]"
        }`}
      >
        <div
          className={`relative h-[80%] p-4 flex items-center justify-center ${
            toggle === false ? theme.PrimaryColorLight : theme.PrimaryColorDark
          } rounded-xl`}
        >
          <button
            type="button"
            onClick={() => cancelTask(false)}
            className="absolute right-2 top-2 bg-red-400 p-2 rounded-xl text-white"
          >
            cancel
          </button>
          <div className="mt-6 flex flex-col gap-4 font-mono">
            <span>
              <label
                className={`${
                  toggle === false ? theme.textLight : theme.textDark
                } mx-1 font-semibold`}
              >
                Title
              </label>
              <input
                type="text"
                value={details.title}
                placeholder="state your task"
                onChange={(e) => {
                  setDetails((prevDetails) => ({
                    ...prevDetails,
                    title: e.target.value,
                  }));
                }}
                className={`rounded-lg text-black border-2 ${
                  toggle === false
                    ? "bg-white border-gray-200"
                    : "bg-gray-100 border-gray-500 placeholder:text-gray-500"
                }  px-4 py-2 w-full`}
              ></input>
            </span>

            <span>
              <label
                className={`${
                  toggle === false ? theme.textLight : theme.textDark
                } mx-1 font-semibold`}
              >
                Description
              </label>
              <input
                type="text"
                value={details.description}
                placeholder="what is the task about"
                onChange={(e) => {
                  setDetails((prevDetails) => ({
                    ...prevDetails,
                    description: e.target.value,
                  }));
                }}
                className={`rounded-lg text-black border-2 ${
                  toggle === false
                    ? "bg-white border-gray-200"
                    : "bg-gray-100 border-gray-500 placeholder:text-gray-500"
                }  px-4 py-2 w-full`}
              ></input>
            </span>

            <span>
              <label
                className={`${
                  toggle === false ? theme.textLight : theme.textDark
                } mx-1 font-semibold`}
              >
                Priority
              </label>

              <select
                className={`rounded-lg text-black border-2 ${
                  toggle === false
                    ? "bg-white border-gray-200"
                    : "bg-gray-100 border-gray-500 placeholder:text-gray-500"
                }  px-4 py-2 w-full`}
              >
                <option className="bg-yellow-300" value={"LOW"} defaultChecked>
                  LOW
                </option>
                <option className="bg-teal-400" value={"MEDIUM"}>
                  MEDIUM
                </option>
                <option className="bg-red-600" value={"HIGH"}>
                  HIGH
                </option>
              </select>
            </span>

            <span>
              <label
                className={`${
                  toggle === false ? theme.textLight : theme.textDark
                } mx-1 font-semibold`}
              >
                DueDate
              </label>
              <input
                type="date"
                value={details.dueDate}
                placeholder="type your password again"
                onChange={(e) => {
                  setDetails((prevDetails) => ({
                    ...prevDetails,
                    dueDate: e.target.value,
                  }));
                }}
                className={`rounded-lg text-black border-2 ${
                  toggle === false
                    ? "bg-white border-gray-200"
                    : "bg-gray-00 border-gray-500 placeholder:text-gray-500"
                }  px-4 py-2 w-full`}
              ></input>
            </span>

            <button
              onClick={handleSubmit}
              className={`bg-green-500 active:scale-[0.95] text-white rounded-lg px-4 py-2 flex items-center justify-center`}
            >
              SUBMIT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTask;
