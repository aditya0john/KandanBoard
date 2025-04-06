"use client";
import { useState } from "react";

function ProgressBarForm() {
  const [progress, setProgress] = useState(0);

  const [detials, setDetails] = useState({
    FullName: "",
    Address: "",
    Role: "",
    CompanyName: "",
  });

  const [stages, setStages] = useState([
    "Personal Details",
    "Address",
    "Billing Details",
    "Payment",
  ]);

  const renderform = () => {
    switch (progress) {
      case 0:
        return (
          <form onSubmit={submit} className="mt-6 flex flex-col gap-4">
            <span>
              <label
                className={`${
                  toggle === false ? theme.textLight : theme.textDark
                } mx-1 font-semibold`}
              >
                Name
              </label>
              <input
                type="text"
                value={detials.FullName}
                placeholder="type your Full Name"
                onChange={(e) => {
                  setDetails((prevDetails) => ({
                    ...prevDetails,
                    FullName: e.target.value,
                  }));
                }}
                className={`rounded-lg text-black border-2 ${
                  toggle === false
                    ? "bg-white border-gray-200"
                    : "bg-gray-00 border-gray-500 placeholder:text-gray-500"
                }  px-4 py-2 w-full`}
              ></input>
            </span>

            <span>
              <label
                className={`${
                  toggle === false ? theme.textLight : theme.textDark
                } mx-1 font-semibold`}
              >
                Role
              </label>
              <input
                type="text"
                value={detials.Role}
                placeholder="type the role you are provided"
                onChange={(e) => {
                  setDetails((prevDetails) => ({
                    ...prevDetails,
                    Role: e.target.value,
                  }));
                }}
                className={`rounded-lg text-black border-2 ${
                  toggle === false
                    ? "bg-white border-gray-200"
                    : "bg-gray-00 border-gray-500 placeholder:text-gray-500"
                }  px-4 py-2 w-full`}
              ></input>
            </span>

            <span>
              <label
                className={`${
                  toggle === false ? theme.textLight : theme.textDark
                } mx-1 font-semibold`}
              >
                Company Name
              </label>
              <input
                type="text"
                value={detials.CompanyName}
                placeholder="example : company_xyz"
                onChange={(e) => {
                  setDetails((prevDetails) => ({
                    ...prevDetails,
                    CompanyName: e.target.value,
                  }));
                }}
                className={`rounded-lg text-black border-2 ${
                  toggle === false
                    ? "bg-white border-gray-200"
                    : "bg-gray-00 border-gray-500 placeholder:text-gray-500"
                }  px-4 py-2 w-full`}
              ></input>
            </span>
          </form>
        );

      case 1:
        return (
          <form onSubmit={submit} className="mt-6 flex flex-col gap-4">
            <span>
              <label
                className={`${
                  toggle === false ? theme.textLight : theme.textDark
                } mx-1 font-semibold`}
              >
                Address
              </label>
              <input
                type="text"
                value={detials.FullName}
                placeholder="type your address"
                onChange={(e) => {
                  setDetails((prevDetails) => ({
                    ...prevDetails,
                    FullName: e.target.value,
                  }));
                }}
                className={`rounded-lg text-black border-2 ${
                  toggle === false
                    ? "bg-white border-gray-200"
                    : "bg-gray-00 border-gray-500 placeholder:text-gray-500"
                }  px-4 py-2 w-full`}
              ></input>
            </span>
            <span>
              {" "}
              <label
                className={`${
                  toggle === false ? theme.textLight : theme.textDark
                } mx-1 font-semibold`}
              >
                Address
              </label>
              <input
                type="text"
                value={detials.Address}
                placeholder="house number - state - area - landmark"
                onChange={(e) => {
                  setDetails((prevDetails) => ({
                    ...prevDetails,
                    Address: e.target.value,
                  }));
                }}
                className={`rounded-lg text-black border-2 ${
                  toggle === false
                    ? "bg-white border-gray-200"
                    : "bg-gray-00 border-gray-500 placeholder:text-gray-500"
                }  px-4 py-2 w-full`}
              ></input>
            </span>

            <span>
              <label
                className={`${
                  toggle === false ? theme.textLight : theme.textDark
                } mx-1 font-semibold`}
              >
                Role
              </label>
              <input
                type="text"
                value={detials.Role}
                placeholder="type the role you are provided"
                onChange={(e) => {
                  setDetails((prevDetails) => ({
                    ...prevDetails,
                    Role: e.target.value,
                  }));
                }}
                className={`rounded-lg text-black border-2 ${
                  toggle === false
                    ? "bg-white border-gray-200"
                    : "bg-gray-00 border-gray-500 placeholder:text-gray-500"
                }  px-4 py-2 w-full`}
              ></input>
            </span>

            <span>
              <label
                className={`${
                  toggle === false ? theme.textLight : theme.textDark
                } mx-1 font-semibold`}
              >
                Company Name
              </label>
              <input
                type="text"
                value={detials.CompanyName}
                placeholder="example : company_xyz"
                onChange={(e) => {
                  setDetails((prevDetails) => ({
                    ...prevDetails,
                    CompanyName: e.target.value,
                  }));
                }}
                className={`rounded-lg text-black border-2 ${
                  toggle === false
                    ? "bg-white border-gray-200"
                    : "bg-gray-00 border-gray-500 placeholder:text-gray-500"
                }  px-4 py-2 w-full`}
              ></input>
            </span>
          </form>
        );
    }
  };

  const Back = () => {
    setProgress((prev) => Math.max(prev - 1, 0));
  };

  const Next = () => {
    setProgress((prev) => Math.min(prev + 1, 3));
  };

  const submit = () => {
    console.log("Form Submitted with Data:", detials);
    alert("Form Submitted!");
  };

  const [toggle, setToggle] = useState(false);
  const [theme, setTheme] = useState({
    ProgressColorLight: "bg-gray-200/[0.1]",
    ProgressColorDark: "bg-black",
    PrimaryColorLight: "bg-gray-100",
    BorderLight: "border-gray-300",
    PrimaryColorDark: "bg-gray-400/[0.2]",
    BorderDark: "border-gray-500",
    textLight: "text-black",
    textDark: "text-white",
  });

  return (
    <div
      className={`h-screen w-screen overflow-hidden ${
        toggle === false ? "bg-white" : "bg-black"
      } flex items-center justify-center text-black/[0.5] select-none transition duration-300`}
    >
      <div className="hidden md:flex absolute right-10 top-10">
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
              className="w-7 h-7"
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
        className={`border-2 ${
          toggle === false
            ? `${theme.PrimaryColorLight} border-gray-300`
            : `${theme.PrimaryColorDark} border-gray-500`
        }  h-screen w-screen md:h-[90%] md:w-[40%] rounded-xl p-4`}
      >
        <span>
          <p
            className={`capitalize text-2xl ${
              toggle === false ? "text-black" : "text-white"
            } font-bold tracking-wide`}
          >
            Welcome, fill the form
          </p>
          <p
            className={`font-semibold ${
              toggle === false ? "text-black" : "text-gray-300"
            }`}
          >
            enter your details below
          </p>
        </span>

        <div className="flex justify-around mt-4">
          {[...Array(4).keys()].map((i) => (
            <div key={i} className="flex flex-col items-center justify-center">
              <div
                className={` ${
                  i <= progress && toggle === false
                    ? `${theme.ProgressColorDark} text-white`
                    : i <= progress && toggle === true
                    ? `bg-white text-black`
                    : `${theme.ProgressColorLight} text-gray-300`
                } h-[60px] w-[60px] rounded-full flex items-center justify-center text-xl `}
              >
                {i + 1}
              </div>
              <p
                className={`${
                  i <= progress && toggle === false
                    ? "text-black"
                    : "text-gray-300"
                }`}
              >
                {stages[i]}
              </p>
            </div>
          ))}
        </div>

        <div className="my-2 mx-6 flex flex-col items-start justify-center relative">
          <span
            className={`h-3 w-full ${
              toggle === false ? "bg-gray-200" : "bg-gray-300/[0.4]"
            } rounded-lg`}
          ></span>
          <span
            className={`h-3 ${
              toggle === false ? "bg-black" : "bg-white"
            } rounded-lg absolute transition-all duration-300`}
            style={{
              width:
                progress === 0
                  ? "13%"
                  : progress === 1
                  ? "40%"
                  : progress === 2
                  ? "67%"
                  : "100%",
            }}
          ></span>
        </div>

        <div>{renderform()}</div>

        {progress < 3 && (
          <div className="mt-8 flex  items-end justify-between px-4">
            <button
              onClick={Back}
              className={`${
                progress > 0 ? "bg-black text-white" : "bg-gray-200/[0.3]"
              } rounded-lg px-4 py-2 flex items-center justify-center`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
              Back
            </button>
            <button
              onClick={Next}
              className={`${
                progress === 3 ? "bg-gray-200" : "bg-black text-white"
              }  text-white rounded-lg px-4 py-2 flex items-center justify-center`}
            >
              Next
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        )}
        {progress === 3 && (
          <div className="mt-8 flex items-end justify-between px-4">
            <button
              onClick={Back}
              className={`${
                progress > 0 ? "bg-black text-white" : "bg-gray-200 "
              } rounded-lg px-4 py-2 flex items-center justify-center`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
              Back
            </button>
            <button
              onSubmit={submit}
              className={`bg-black text-white rounded-lg px-4 py-2 flex items-center justify-center`}
            >
              SUBMIT
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProgressBarForm;
