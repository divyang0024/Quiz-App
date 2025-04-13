import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetAllAction } from "../redux/questionReducer";
import { resetResultAction } from "../redux/resultReducer";
import { attemptsNumber, earnPointsNumber, flagResult } from "../helper/helper";
import { usePublishResult } from "../hooks/setAnswer";
import PassFailChart from "./PassFailChart";
import dvquizapp from "../../dvquizapp.png"; // Updated image path

function Result() {
  const dispatch = useDispatch();
  const [showResult, setShowResult] = useState(true);
  const [resultPosted, setResultPosted] = useState(false); // Track if result is posted

  const {
    questions: { queue, answers },
    result: { result, userId },
  } = useSelector((state) => state);

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

  useEffect(() => {
    // Ensure result is only posted once
    if (!resultPosted && result && userId) {
      usePublishResult({
        result,
        username: userId,
        attempts,
        points: earnPoints,
        achived: flag ? "passed" : "failed",
      });
      setResultPosted(true); // Mark as posted
    }
  }, [result, userId, resultPosted, attempts, earnPoints, flag]);

  const onRestart = () => {
    dispatch(resetAllAction());
    dispatch(resetResultAction());
    setResultPosted(false); // Reset the result posted flag on restart
  };

  const toggleView = () => {
    setShowResult(!showResult);
  };

  return (
    <div className="min-h-screen bg-[#32012F] flex items-center justify-center p-4">
      <div className="bg-[#E2DFD0] w-full max-w-4xl p-8 rounded-xl shadow-lg border-2 border-[#F97300] transform transition duration-300 hover:shadow-xl">
        {/* Logo and Heading Section */}
        <div className="flex items-center gap-2 mb-8">
          <img
            src={dvquizapp}
            alt="DV Quiz App Logo"
            className="w-16 sm:w-20 md:w-24 h-auto rounded-full border-2 border-[#F97300]"
          />
          <h1 className="text-[#F97300] font-bold text-3xl sm:text-4xl">
            Quiz Application
          </h1>
        </div>

        {showResult ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-[#32012F] font-medium">
            <div className="flex justify-between items-center p-4 rounded-lg border-2 border-[#F97300]">
              <span>Email:</span>
              <span className="font-bold text-[#F97300]">{userId}</span>
            </div>
            <div className="flex justify-between items-center p-4 rounded-lg border-2 border-[#F97300]">
              <span>Total Quiz Points:</span>
              <span className="font-bold text-[#F97300]">{totalPoints}</span>
            </div>
            <div className="flex justify-between items-center p-4 rounded-lg border-2 border-[#F97300]">
              <span>Total Questions:</span>
              <span className="font-bold text-[#F97300]">{queue.length}</span>
            </div>
            <div className="flex justify-between items-center p-4 rounded-lg border-2 border-[#F97300]">
              <span>Total Attempts:</span>
              <span className="font-bold text-[#F97300]">{attempts}</span>
            </div>
            <div className="flex justify-between items-center p-4 rounded-lg border-2 border-[#F97300]">
              <span>Total Earned Points:</span>
              <span className="font-bold text-[#F97300]">{earnPoints}</span>
            </div>
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex justify-between items-center p-4 rounded-lg border-2 border-[#F97300]">
              <span className="text-lg">Quiz Result:</span>
              <span
                className={`text-xl font-bold p-3 border-2 border-dashed rounded-lg ${
                  flag
                    ? "text-[#32CD32] border-[#32CD32]"
                    : "text-[#DC143C] border-[#DC143C]"
                }`}
              >
                {flag ? "PASSED" : "FAILED"}
              </span>
            </div>
          </div>
        ) : (
          <div className="mt-6">
            <PassFailChart />
          </div>
        )}

        {/* View and Restart Buttons in Column on Small Viewports */}
        <div className="flex flex-col sm:flex-row justify-center mt-6 gap-4">
          <button
            onClick={toggleView}
            className="bg-[#F97300] text-[#E2DFD0] font-semibold px-6 py-2 rounded-lg hover:bg-[#E2DFD0] hover:text-[#F97300] hover:border-2 hover:border-[#F97300] transition duration-300 w-full sm:w-auto"
          >
            {showResult ? "View Stats" : "View Result"}
          </button>
          <Link to="/">
            <button
              onClick={onRestart}
              className="bg-[#F97300] text-[#E2DFD0] font-semibold px-6 py-2 rounded-lg hover:bg-[#E2DFD0] hover:text-[#F97300] hover:border-2 hover:border-[#F97300] transition duration-300 w-full sm:w-auto"
            >
              Restart
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Result;
