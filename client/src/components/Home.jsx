import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUserId } from "../redux/resultReducer";

function Home() {
  const email = useRef(null);
  const password = useRef(null);

  const [formError, setFormError] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State for loading
  const redirectQuiz = useNavigate();
  const dispatch = useDispatch();

  const startQuiz = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    try {
      const result = await axios.post(
        "https://quiz-app-98y5-git-main-divyang0024s-projects.vercel.app/user/verifyUser",
        {
          password: password.current?.value,
          email: email.current?.value,
        }
      );
      console.log("API Response:", result.data); // Debug
      if (result.data.msg === true) {
        dispatch(setUserId(result.data.email));
        redirectQuiz("/quiz", { replace: true });
      } else {
        setFormError(true);
        setTimeout(() => {
          setFormError(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Error during submission:", error); // Debug
      setFormError(true);
      setTimeout(() => {
        setFormError(false);
      }, 2000);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-[#32012F] p-4 sm:p-6 lg:p-8">
        <div className="bg-[#E2DFD0] rounded-xl p-6 sm:p-8 shadow-lg border-2 border-[#F97300] w-full max-w-md mx-auto">
          <h1 className="text-center text-[#F97300] text-3xl sm:text-4xl font-bold mb-6">
            Quiz Application
          </h1>
          <div className="space-y-4">
            <div className="space-y-3 text-sm sm:text-base text-[#32012F]">
              <p className="flex items-center">
                <span className="text-[#F97300] font-semibold mr-2">1.</span>
                You will be asked ten questions one after another.
              </p>
              <p className="flex items-center">
                <span className="text-[#F97300] font-semibold mr-2">2.</span>
                10 points is awarded for the correct answer.
              </p>
              <p className="flex items-center">
                <span className="text-[#F97300] font-semibold mr-2">3.</span>
                Each question has four options. You can choose only one option.
              </p>
              <p className="flex items-center">
                <span className="text-[#F97300] font-semibold mr-2">4.</span>
                You can review and change answers before the quiz finishes.
              </p>
              <p className="flex items-center">
                <span className="text-[#F97300] font-semibold mr-2">5.</span>
                The result will be declared at the end of the quiz.
              </p>
            </div>
            <form id="form" className="space-y-4" onSubmit={startQuiz}>
              <div className="flex flex-col">
                <input
                  ref={email}
                  type="email"
                  placeholder="Email"
                  className="w-full text-[#F97300] p-3 rounded-lg border-2 border-[#F97300] bg-[#E2DFD0] placeholder-[#f974007a] focus:outline-none font-semibold text-base focus:ring-2 focus:ring-[#F97300]/50"
                  required
                />
              </div>
              <div className="flex flex-col">
                <input
                  ref={password}
                  type="password"
                  placeholder="Password"
                  className="w-full text-[#F97300] p-3 rounded-lg border-2 border-[#F97300] bg-[#E2DFD0] placeholder-[#f974007a] focus:outline-none font-semibold text-base focus:ring-2 focus:ring-[#F97300]/50"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#F97300] text-[#E2DFD0] font-semibold py-3 rounded-lg border-2 border-transparent hover:border-[#F97300] hover:bg-[#E2DFD0] hover:text-[#F97300] transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-base"
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
              {isLoading && (
                <div className="w-full bg-[#F97300]/20 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#F97300] h-full animate-loading-bar rounded-full transition-all duration-1000 ease-in-out"
                    style={{ width: "0%" }}
                  >
                    <style>
                      {`
                        @keyframes loading {
                          from {
                            width: 0%;
                          }
                          to {
                            width: 100%;
                          }
                        }
                        .animate-loading-bar {
                          animation: loading 1s forwards;
                        }
                      `}
                    </style>
                  </div>
                </div>
              )}
              {formError && (
                <h1 className="text-center text-[#DC143C] text-lg font-semibold mt-4">
                  Invalid password or email.
                </h1>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
