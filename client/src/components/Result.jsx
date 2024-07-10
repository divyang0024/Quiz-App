import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetAllAction } from "../redux/questionReducer";
import { resetResultAction } from "../redux/resultReducer";
import { attemptsNumber, earnPointsNumber, flagResult } from "../helper/helper";
import { usePublishResult } from "../hooks/setAnswer";

function Result() {
  const dispatch = useDispatch();

  const {
    questions: { queue, answers },
    result: { result, userId },
  } = useSelector((state) => state);

  useEffect(() => {
    // console.log();
  });

  const totalPoints = queue.length * 10;
  const attempts = attemptsNumber(result);
  const charArr = answers.map((elem) => elem.answer);
  const answer = charArr.map((char) => {
    const letter = char.charAt(0);
    const letterToNumberMap = {
      A: 0,
      B: 1,
      C: 2,
      D: 3,
    };
    return letterToNumberMap[letter];
  });
  const earnPoints = earnPointsNumber(result, answer);
  const flag = flagResult(totalPoints, earnPoints);
  // console.log(result, attempts, earnPoints, flag);
  usePublishResult({
    result,
    username: userId,
    attempts,
    points: earnPoints,
    achived: flag ? "passed" : "failed",
  });

  const onRestart = () => {
    dispatch(resetAllAction());
    dispatch(resetResultAction());
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-[#32012F]">
        <div className="flex rounded-r-2xl  p-8 bg-[#E2DFD0] rounded-l-xl flex-col gap-6 min-w-[30%] max-w-lg ">
          <h1 className=" text-center text-[#F97300] text-4xl font-semibold">
            Quiz Application
          </h1>
          <div className="flex flex-col gap-4 border-2 border-[#F97300] rounded-lg p-4">
            <div className="flex justify-between">
              <span>Username : </span>
              <span className="text-[#F97300] font-bold">{userId}</span>
            </div>
            <hr className="border-[#F97300]" />
            <div className="flex justify-between">
              <span>Total Quiz Points : </span>
              <span className="text-[#F97300] font-bold">{totalPoints}</span>
            </div>
            <hr className="border-[#F97300]" />

            <div className="flex justify-between">
              <span>Total Questions : </span>
              <span className="text-[#F97300] font-bold">{queue.length}</span>
            </div>
            <hr className="border-[#F97300]" />

            <div className="flex justify-between">
              <span>Total Attempts : </span>
              <span className="text-[#F97300] font-bold">{attempts}</span>
            </div>
            <hr className="border-[#F97300]" />

            <div className="flex justify-between">
              <span>Total Earn Points : </span>
              <span
                className={`font-bold ${
                  flag ? "text-[#32CD32]" : "text-[#DC143C]"
                }`}
              >
                {earnPoints}
              </span>
            </div>
            <hr className="border-2 border-[#F97300]" />
            <div className="flex justify-between">
              <span>Quiz Result : </span>
              <span
                className={`text-2xl ${
                  flag
                    ? "text-[#32CD32] font-bold border-dashed border-2 p-2 border-[#32CD32]"
                    : "text-[#DC143C] font-bold border-dashed border-2 p-2 border-[#DC143C]"
                }`}
              >
                {flag ? "PASSED" : "FAILED"}
              </span>
            </div>
            <div className="flex gap-4">
              <div className="bg-[#F97300] border-2 border-transparent font-semibold text-[#E2DFD0] px-16 py-2 rounded-lg self-center hover:border-[#F97300] hover:bg-[#E2DFD0] hover:text-[#F97300] duration-300">
                <Link to="/" onClick={onRestart}>
                  Restart
                </Link>
              </div>
              <div className="bg-[#F97300] border-2 border-transparent font-semibold text-[#E2DFD0] px-16 py-2 rounded-lg self-center hover:border-[#F97300] hover:bg-[#E2DFD0] hover:text-[#F97300] duration-300">
                <Link to="/logs">Global logs</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Result;
