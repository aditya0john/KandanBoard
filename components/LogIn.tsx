"use client";
import { theme } from "@/lib/data";
import axios from "axios";
import { em } from "framer-motion/client";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function Login({ onLoginSuccess }: { onLoginSuccess: () => void }) {
  const [progress, setProgress] = useState(0);
  const [OTP, setOtp] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [signUp, setSignUp] = useState(false);

  const [details, setDetails] = useState({
    UserName: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
    otp: "",
  });

  const stages = ["Personal Details", "Verification"];

  const renderform = () => {
    switch (progress) {
      case 0:
        return (
          <form
            onSubmit={submit}
            className="mt-6 flex flex-col gap-4 font-mono"
          >
            <span className={`${signUp === false ? "" : "hidden"}`}>
              <label
                className={`${
                  toggle === false ? theme.textLight : theme.textDark
                } mx-1 font-semibold`}
              >
                User Name
              </label>
              <input
                type="text"
                value={details.UserName}
                placeholder="type your user name"
                onChange={(e) => {
                  setDetails((prevDetails) => ({
                    ...prevDetails,
                    UserName: e.target.value,
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
                E-Mail
              </label>
              <input
                type="email"
                value={details.Email}
                placeholder="type your email, Example : xyz123@gmail.com"
                onChange={(e) => {
                  setDetails((prevDetails) => ({
                    ...prevDetails,
                    Email: e.target.value,
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
                Password
              </label>
              <input
                type="password"
                value={details.Password}
                placeholder="type a password"
                onChange={(e) => {
                  setDetails((prevDetails) => ({
                    ...prevDetails,
                    Password: e.target.value,
                  }));
                }}
                className={`rounded-lg text-black border-2 ${
                  toggle === false
                    ? "bg-white border-gray-200"
                    : "bg-gray-00 border-gray-500 placeholder:text-gray-500"
                }  px-4 py-2 w-full`}
              ></input>
            </span>

            <span className={`${signUp === false ? "" : "hidden"}`}>
              <label
                className={`${
                  toggle === false ? theme.textLight : theme.textDark
                } mx-1 font-semibold`}
              >
                ConfirmPassword
              </label>
              <input
                type="password"
                value={details.ConfirmPassword}
                placeholder="type your password again"
                onChange={(e) => {
                  setDetails((prevDetails) => ({
                    ...prevDetails,
                    ConfirmPassword: e.target.value,
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
                OTP
              </label>
              <input
                type="text"
                value={details.otp}
                placeholder="enter the OTP sent to your mail"
                onChange={(e) => {
                  setDetails((prevDetails) => ({
                    ...prevDetails,
                    otp: e.target.value,
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

  const sendMail = async () => {
    setIsSending(true);
    try {
      const response = await axios.post("/api/sendMail", {
        email: details.Email,
        name: details.UserName,
      });

      const { message, otp, alreadyExists } = response.data;

      if (response.status === 200) {
        toast.success(message + "\n" + details.Email);

        if (!alreadyExists) {
          setOtp(otp);
          setProgress((prev) => Math.min(prev + 1, 3));
        } else {
          setSignUp(true);
          toast.success("Continue to LogIn", {
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
          console.warn("User already exists. Skipping progress update.");
        }
      } else {
        toast.error(message);
        console.error(message || "Unknown error");
      }
    } catch (error: any) {
      toast.error("OTP ERROR");
      console.error(
        "Error sending email:",
        error.response?.data || error.message
      );
    } finally {
      setIsSending(false);
    }
  };

  const Back = () => {
    setProgress((prev) => Math.max(prev - 1, 0));
  };

  const Next = async () => {
    if (details.UserName === "" && details.Email == "") {
      toast.error("Don't leave any field empty");
      return;
    }
    if (
      details.Password == "" ||
      (details.ConfirmPassword == "" && signUp === false)
    ) {
      toast.error("Fill Password and Confirm Password");
      return;
    }
    if (details.Password !== details.ConfirmPassword && signUp === false) {
      toast.error("Passwords don't match");
      return;
    }
    if (!signUp) await sendMail();
  };

  const LoginUser = async () => {
    try {
      const response = await axios.post("/api/loginUser", {
        email: details.Email,
        password: details.Password,
      });

      if (response.data?.token) {
        toast.success(`Welcome back ${details.UserName}`);
        console.log("response.data", response.data);

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("userName", response.data.userName);
        localStorage.setItem("userEmail", response.data.userEmail);
        onLoginSuccess();
      }
    } catch (error) {
      toast.error("Error logging in");
      console.error(error);
    }
  };

  const submit = async () => {
    if (details.otp !== OTP) {
      toast.error(`Wrong OTP`);
      return; // stop execution if wrong OTP
    }

    try {
      toast.success("Wait Loggin you in");

      const response = await axios.post("/api/login", {
        email: details.Email,
        name: details.UserName,
        otp: details.otp,
        correctOtp: OTP,
        password: details.Password,
      });

      if (response.data?.token) {
        toast.success(
          `YAY!! Welcome ${details.UserName} we now work together.`
        );
        console.log("response.data", response.data);

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("userName", response.data.userName);
        localStorage.setItem("userEmail", response.data.userEmail);
        onLoginSuccess();
      } else {
        toast.error(response.data.error || "Login failed");
      }
    } catch (error) {
      toast.error("Error logging in");
      console.error(error);
    }
  };

  return (
    <div
      className={`h-screen w-screen overflow-hidden ${
        toggle === false ? "bg-white" : "bg-black"
      } flex flex-col items-center justify-center text-black/[0.5] select-none transition duration-300`}
    >
      <Toaster />

      <div
        className={`text-[3rem] font-semibold ${
          toggle == false ? "text-black" : "text-white"
        }`}
      >
        Kanban Board
      </div>

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
        className={`relative border-2 ${
          toggle === false
            ? `${theme.PrimaryColorLight} border-gray-300`
            : `${theme.PrimaryColorDark}  border-gray-500`
        }  h-screen w-screen md:h-[85%] md:w-[40%] rounded-xl p-4`}
      >
        <span className="flex items-center text-2xl">
          <p
            className={`capitalize ${
              toggle === false ? "text-black" : "text-white"
            } font-bold tracking-wide`}
          >
            {signUp === false ? "SIGN IN," : "LOG IN,"}
            <span className="italic lowercase"> enter your details</span>
          </p>
        </span>

        <div className="flex justify-around mt-4">
          {stages
            .filter((stage) =>
              signUp === false ? stage : stage === "Personal Details"
            )
            .map((_, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center"
              >
                <div
                  className={`${
                    i <= progress && toggle === false
                      ? `${theme.ProgressColorDark} text-white`
                      : i <= progress && toggle === true
                        ? `bg-white text-black`
                        : `${theme.ProgressColorLight} text-gray-300`
                  } h-[60px] w-[60px] rounded-full flex items-center justify-center text-xl`}
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
              width: progress === 0 ? "26%" : "100%",
            }}
          ></span>
        </div>

        <div>{renderform()}</div>

        {progress < 1 && (
          <div className="flex justify-around absolute bottom-4 w-full">
            <button
              type="button"
              onClick={Back}
              className={`${
                progress > 0 ? "bg-black text-white" : "hidden"
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
              type="button"
              onClick={signUp === false ? Next : LoginUser}
              className={`${
                progress === 1 ? "bg-gray-200" : "bg-black text-white"
              }  text-white rounded-lg px-4 py-2 flex items-center justify-center`}
            >
              {isSending ? (
                "Sending OTP..."
              ) : (
                <>
                  {signUp === false ? "Next" : "LogIn"}
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
                </>
              )}
            </button>
          </div>
        )}
        {progress === 1 && (
          <div className="flex justify-around absolute bottom-8 w-full">
            <button
              type="button"
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
              type="button"
              onClick={submit}
              className={`bg-green-500 active:scale-[0.95] text-white rounded-lg px-4 py-2 flex items-center justify-center`}
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
        <span className="absolute bottom-0 right-2 lowercase italic text-md">
          {signUp === false ? (
            <div
              className={`${
                toggle === false ? "text-black/[0.6]" : "text-white/[0.6]"
              }`}
            >
              Already a member, yay{" "}
              <button
                className="text-purple-400 underline italic"
                onClick={() => setSignUp(!signUp)}
              >
                Login!!
              </button>
            </div>
          ) : (
            <div
              className={`${
                toggle === false ? "text-black/[0.6]" : "text-white/[0.6]"
              }`}
            >
              Not a member?{" "}
              <button
                className="text-purple-400 underline italic"
                onClick={() => setSignUp(!signUp)}
              >
                SignUp!!
              </button>
            </div>
          )}
        </span>
      </div>
    </div>
  );
}

export default Login;
