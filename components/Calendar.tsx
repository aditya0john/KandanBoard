"use client";
import { calendar } from "@/data";
import React, { useEffect, useState } from "react";

function Calendar() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMonth, setSeletedMonth] = useState({
    trigger: false,
    month: "",
    id: "",
  });
  const [timeTable, setTImeTable] = useState({
    date: "",
    month: "",
  });

  console.log(timeTable.date, timeTable.month);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 3500);

    setTImeTable((prev: any) => ({
      ...prev,
      date: new Date().getDate(),
      month: new Date().getMonth(),
    }));
  }, []);

  const flashScreen = () => {
    return (
      <div className="flex items-center justify-center h-screen w-screen PrimaryForeground text-7xl font-sans fade">
        <p className="font-semibold">John</p>, Welcome to Your Calendar
        <span className="twirl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1"
            stroke="currentColor"
            className="w-36 h-36 relative -top-4 rotate-12"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
            />
          </svg>
        </span>
      </div>
    );
  };

  return (
    <div className="PrimaryBackground h-full w-full select-none">
      {isLoading && flashScreen()}
      {!isLoading && selectedMonth.trigger == false && (
        <div className="h-full w-full grid grid-cols-2 lg:grid-cols-4 gap-12 lg:scale-95 p-2">
          {calendar.map((data, i) => (
            <button
              key={i}
              onClick={() => {
                setSeletedMonth((prev: any) => ({
                  ...prev,
                  trigger: true,
                  month: data.month,
                  id: i,
                }));
              }}
              className="flex gap-2 flex-col items-center justify-top p-1 rounded-lg hover:bg-green-950/[0.1] hover:scale-105 transition duration-100"
            >
              <span
                className={`PrimaryForeground font-semibold flex items-top justify-center capitalize text-xl ${
                  data.id == timeTable.month + 1
                    ? "bg-green-950/[0.1] rounded-lg p-1"
                    : ""
                }`}
              >
                {data?.month}
              </span>
              <span className="PrimaryForeground">
                <table>
                  <tbody className="grid grid-cols-7 gap-6">
                    {Array(i % 2 === 0 ? 31 : 30)
                      .fill(null)
                      .map((_, j) => (
                        <tr key={j}>
                          <td
                            className={`${
                              data.id == timeTable.month + 1 &&
                              j == timeTable.date
                                ? "bg-green-950/[0.1] blinkDate"
                                : ""
                            }`}
                          >
                            {j + 1}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </span>
            </button>
          ))}
        </div>
      )}
      {!isLoading && selectedMonth.trigger && (
        <div className="h-screen w-screen overflow-hidden relative">
          {/* BACK Button */}
          <button
            onClick={() =>
              setSeletedMonth((prev) => ({
                ...prev,
                trigger: false,
              }))
            }
            className="bg-green-950/[0.1] PrimaryForeground p-2 absolute top-10 left-10"
          >
            BACK
          </button>

          {/* Main Content */}
          <div className="PrimaryForeground flex flex-col items-center justify-center h-full">
            {calendar
              .filter((e) => e.month === selectedMonth.month)
              .map((data, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-12 items-center justify-center"
                >
                  {/* Month Title */}
                  <span className="PrimaryForeground font-semibold capitalize text-4xl lg:text-6xl">
                    {data?.month}
                  </span>

                  {/* Dates */}
                  <div className="PrimaryForeground grid grid-cols-7 gap-10">
                    {Array(selectedMonth?.id % 2 === 0 ? 31 : 30)
                      .fill(null)
                      .map((_, j) => (
                        <span
                          key={j}
                          className="hover:scale-[1.2] transform duration-100 hover:bg-green-950/[0.1] flex items-center justify-center rounded-full p-1"
                        >
                          <p
                            className={`text-3xl lg:text-5xl ${
                              data.id === timeTable.month + 1 &&
                              j === timeTable.date
                                ? "bg-green-950/[0.1] blinkDate rounded-full"
                                : ""
                            }`}
                          >
                            {j + 1}
                          </p>
                        </span>
                      ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Calendar;
