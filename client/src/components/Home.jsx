import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUserId } from "../redux/resultReducer";

function Home() {
 
  const email = useRef(null);
  const password = useRef(null);

  const [formError, setFormError] = useState(false);
  const redirectQuiz = useNavigate();
  const dispatch = useDispatch();

  const startQuiz = async (e) => {
    e.preventDefault();
    const result = await axios.post("http://localhost:3000/user/verifyUser", {
      password: password.current?.value,
      email: email.current?.value,
    });
    if (result.data.msg === true) {
      dispatch(setUserId(result.data.name));
      redirectQuiz("/quiz", { replace: true });
    } else {
      setFormError(true);
      setTimeout(() => {
        setFormError(false);
      }, 2000);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-[#32012F]">
        <div className="flex p-8 bg-[#E2DFD0] rounded-xl flex-col gap-6 ">
          <h1 className=" text-center text-[#F97300] text-4xl font-semibold">
            Quiz Application
          </h1>
          <ul className="">
            <li>
              <span className="text-[#F97300] font-semibold">1. </span>You will
              be asked ten questions one after another.
            </li>
            <li>
              <span className="text-[#F97300] font-semibold">2. </span>10 points
              is awarded for the correct answer.
            </li>
            <li>
              <span className="text-[#F97300] font-semibold">3. </span>Each
              question has four options.You can choose only one options.
            </li>
            <li>
              <span className="text-[#F97300] font-semibold">4. </span>You can
              review and change answer before the quiz finish.
            </li>
            <li>
              <span className="text-[#F97300] font-semibold">5. </span>The
              result will be declared at the end of the quiz.
            </li>
          </ul>
          <form id="form" className="flex flex-col gap-2">
            <input
              ref={email}
              type="email"
              placeholder="Email"
              className="text-[#F97300] p-2 rounded-lg border-2 border-[#F97300] bg-[#E2DFD0] placeholder-[#f974007a] focus:outline-none font-semibold "
              required
            />
            <input
              ref={password}
              type="password"
              placeholder="Password"
              className="text-[#F97300] p-2 rounded-lg border-2 border-[#F97300] bg-[#E2DFD0] placeholder-[#f974007a] focus:outline-none font-semibold "
              required
            />
            <div className="bg-[#F97300] mt-4 border-2 border-transparent font-semibold text-[#E2DFD0] px-16 py-2 rounded-lg self-center hover:border-[#F97300] hover:bg-[#E2DFD0] hover:text-[#F97300] duration-300">
              <button type="submit" onClick={startQuiz}>
                Submit
              </button>
            </div>
            {formError && (
              <h1 className=" text-center text-[#DC143C] text-lg font-semibold">
                Invalid password or email.
              </h1>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default Home;
