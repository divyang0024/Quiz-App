import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { moveNextQuestion, movePrevQuestion } from "../hooks/FetchQuestions";
import { PushAnswer } from "../hooks/setAnswer";
import Questions from "./Questions";
import { Navigate } from "react-router-dom";
import dvquizapp from "../../dvquizapp.png";

function Quiz() {
  const [check, setChecked] = useState(undefined);
  const dispatch = useDispatch();
  const trace = useSelector((state) => state.questions.trace);
  const queue = useSelector((state) => state.questions.queue);
  const result = useSelector((state) => state.result.result);

  useEffect(() => {
    // console.log(result);
  });

  const onNext = () => {
    if (trace < queue.length) {
      dispatch(moveNextQuestion());
      if (result.length <= trace) {
        dispatch(PushAnswer(check));
      }
    }
    setChecked(undefined);
  };

  const onPrev = () => {
    if (trace > 0) dispatch(movePrevQuestion());
  };

  const onChecked = (check) => {
    setChecked(check);
  };

  if (result.length && result.length >= queue.length) {
    return <Navigate to="/result" replace={true} />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#32012F] p-4 sm:p-6 lg:p-8">
      <div className="flex w-full max-w-2xl">
        <div className="bg-[#E2DFD0] rounded-xl p-6 sm:p-8 shadow-lg border-2 border-[#F97300] w-full">
          {/* Logo and Heading Section */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            <img
              src={dvquizapp}
              alt="DV Quiz App Logo"
              className="w-20 sm:w-24 h-20 sm:h-24 rounded-full border-2 border-[#F97300] object-contain"
            />
            <h1 className="text-[#F97300] font-bold text-3xl sm:text-4xl text-center sm:text-left leading-tight">
              DV Quiz App
            </h1>
          </div>

          <div className="space-y-6">
            <Questions onChecked={onChecked} />
            <div className="flex justify-between gap-4">
              {trace > 0 ? (
                <button
                  className="w-1/2 bg-[#F97300] text-[#E2DFD0] font-semibold py-3 rounded-lg border-2 border-transparent hover:border-[#F97300] hover:bg-[#E2DFD0] hover:text-[#F97300] transition duration-300"
                  onClick={onPrev}
                >
                  Prev
                </button>
              ) : (
                <button
                  className="w-1/2 bg-transparent border-2 border-transparent text-transparent py-3 rounded-lg cursor-default"
                  disabled
                >
                  Prev
                </button>
              )}
              {trace === queue.length - 1 ? (
                <button
                  className="w-1/2 bg-[#32012F] text-[#E2DFD0] font-semibold py-3 rounded-lg border-2 border-transparent hover:border-[#32012F] hover:bg-[#E2DFD0] hover:text-[#32012F] transition duration-300"
                  onClick={onNext}
                >
                  Submit
                </button>
              ) : (
                <button
                  className="w-1/2 bg-[#F97300] text-[#E2DFD0] font-semibold py-3 rounded-lg border-2 border-transparent hover:border-[#F97300] hover:bg-[#E2DFD0] hover:text-[#F97300] transition duration-300"
                  onClick={onNext}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
