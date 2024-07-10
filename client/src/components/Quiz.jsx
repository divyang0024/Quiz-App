import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { moveNextQuestion, movePrevQuestion } from "../hooks/FetchQuestions";
import { PushAnswer } from "../hooks/setAnswer";

//component import
import Questions from "./Questions";
import { Navigate } from "react-router-dom";

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
    return <Navigate to="/result" replace="true" />;
  }

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-[#32012F]">
        <div className="flex">
          <div className="flex p-8 bg-[#E2DFD0] rounded-xl flex-col gap-6 min-w-[30%] max-w-lg ">
            <h1 className=" text-center text-[#F97300] text-4xl font-semibold">
              Quiz Application
            </h1>
            <Questions onChecked={onChecked} />
            <div className="flex justify-between mt-2 gap-x-4 flex-auto">
              {trace > 0 ? (
                <button
                  className="bg-[#F97300] border-2 border-transparent font-semibold text-[#E2DFD0] px-16 py-2 rounded-lg self-center hover:border-[#F97300] hover:bg-[#E2DFD0] hover:text-[#F97300] duration-300"
                  onClick={onPrev}
                >
                  Prev
                </button>
              ) : (
                <button className=" bg-transparent border-2 border-transparent font-semibold text-transparent px-16 py-2 rounded-lg self-center hover:cursor-default">
                  Prev
                </button>
              )}
              {trace == queue.length - 1 ? (
                <button
                  className="bg-[#32012F] border-2 border-transparent font-semibold text-[#E2DFD0] px-16 py-2 rounded-lg self-center hover:border-[#32012F] hover:bg-[#E2DFD0] hover:text-[#32012F] duration-300"
                  onClick={onNext}
                >
                  Submit
                </button>
              ) : (
                <button
                  className="bg-[#F97300] border-2 border-transparent font-semibold text-[#E2DFD0] px-16 py-2 rounded-lg self-center hover:border-[#F97300] hover:bg-[#E2DFD0] hover:text-[#F97300] duration-300"
                  onClick={onNext}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Quiz;
