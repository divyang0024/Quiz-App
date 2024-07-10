import React, { useEffect, useState } from "react";
// import data from "../database/data.js";
import { useSelector, useDispatch } from "react-redux";
import { useFetchQuestion } from "../hooks/FetchQuestions.js";
import { updateResult } from "../hooks/setAnswer.js";

function Questions({ onChecked }) {
  const [checked, setChecked] = useState(undefined);
  // const question = data[0];
  const [{ isLoading, apiData, serverError }] = useFetchQuestion();
  const result = useSelector((state) => state.result.result);
  const trace = useSelector((state) => state.questions.trace);
  const dispatch = useDispatch();

  const question = useSelector(
    (state) => state.questions.queue[state.questions.trace]
  );

  useEffect(() => {
    dispatch(updateResult({ trace, checked }));
  }, [checked]);

  const onSelect = (i) => {
    onChecked(i);
    setChecked(i);
    dispatch(updateResult({ trace, checked }));
  };

  if (isLoading)
    return (
      <h1 className="text-[#32CD32] text-3xl self-center px-4 ">
        Is Loading....
      </h1>
    );
  if (serverError)
    return (
      <h1 className="text-[#DC143C] text-3xl ">
        We have run into some problems.
      </h1>
    );

  return (
    <>
      <h2 className="font-bold text-justify">
        <span key={`Q${trace + 1}`} className="text-[#F97300]">
          {trace + 1}.
        </span>
        &nbsp;
        {question?.question}
      </h2>
      <ul key={question?.id} className="gap-6 flex flex-col">
        {question?.options.map((data, key) => (
          <li
            className="relative flex items-center border-2 border-[#F97300] p-2 rounded-lg hover:text-[#E2DFD0] hover:bg-[#F97300] duration-300"
            key={key}
          >
            <span
              className={`${
                result[trace] == key
                  ? "bg-[#32012F] left-3 rounded-full p-1 absolute"
                  : ""
              }`}
            ></span>
            <input
              type="radio"
              name="options"
              value={false}
              id={`data${trace + 1}.${key}-option`}
              onChange={() => onSelect(key)}
              className={`w-4 h-4 accent-[#32012F]`}
            />
            &nbsp;
            <label htmlFor={`data${trace + 1}.${key}-option`} className="">
              {data}
            </label>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Questions;
