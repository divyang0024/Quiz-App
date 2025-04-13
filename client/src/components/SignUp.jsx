import React, { useState } from "react";
import RedErrorMessage from "./RedErrorMessage";
import { Form, Formik, Field } from "formik";
import { useNavigate } from "react-router";
import { generateToken } from "../helper/helper.js";
import * as yup from "yup";
import Cookies from "js-cookie";
import axios from "axios";
import dvquizapp from "../../dvquizapp.png";

function SignUp() {
  const [formError, setFormError] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const redirectToHome = useNavigate();

  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const formSchema = yup.object({
    name: isLogin
      ? yup.string()
      : yup
          .string("Must start with a character")
          .min(3)
          .max(20)
          .required("Cannot leave name field empty"),
    password: yup
      .string("Must be string")
      .min(8)
      .required("Cannot leave password field empty"),
    email: yup
      .string()
      .matches(emailRegex, "Not a valid email")
      .required("Cannot leave email field empty"),
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#32012F] p-4 sm:p-6 lg:p-8">
      <div className="bg-[#E2DFD0] rounded-xl p-6 sm:p-8 shadow-lg border-2 border-[#F97300] w-full max-w-md mx-auto">
        {/* Logo and Heading */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <img
            src={dvquizapp}
            alt="DV Quiz App Logo"
            className="w-20 sm:w-24 h-20 sm:h-24 rounded-full border-2 border-[#F97300] object-contain"
          />
          <h1 className="text-[#F97300] font-bold text-3xl sm:text-4xl text-center sm:text-left leading-tight">
            {isLogin ? "Login" : "Signup"}
          </h1>
        </div>

        <Formik
          initialValues={{ name: "", password: "", email: "" }}
          validationSchema={formSchema}
          onSubmit={async ({ name, password, email }, { setSubmitting }) => {
            setIsLoading(true);
            try {
              if (isLogin) {
                const res = await axios.post(
                  "https://quiz-app-98y5-git-main-divyang0024s-projects.vercel.app/user/verifyUser",
                  { email, password }
                );
                if (res.data.msg) {
                  const token = await generateToken({
                    name: res.data.name,
                    email,
                  });
                  Cookies.set("uid", token);
                  redirectToHome("/", { replace: true });
                } else {
                  setFormError(true);
                  setTimeout(() => setFormError(false), 2000);
                }
              } else {
                const response = await axios.post(
                  "https://quiz-app-98y5-git-main-divyang0024s-projects.vercel.app/user/getUsers",
                  { email }
                );
                if (response.data.msg) {
                  setFormError(true);
                  setTimeout(() => setFormError(false), 2000);
                } else {
                  const data = await axios.post(
                    "https://quiz-app-98y5-git-main-divyang0024s-projects.vercel.app/user/registerUser",
                    { name, email, password }
                  );
                  const token = await generateToken({
                    name: data.data.name,
                    email: data.data.email,
                  });
                  Cookies.set("uid", token);
                  redirectToHome("/", { replace: true });
                }
              }
            } catch (err) {
              console.error("Submission error:", err);
              setFormError(true);
              setTimeout(() => setFormError(false), 2000);
            } finally {
              setIsLoading(false);
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              {!isLogin && (
                <div className="mb-4">
                  <label
                    htmlFor="myName"
                    className="block text-[#F97300] font-bold mb-2"
                  >
                    Name:
                  </label>
                  <Field
                    type="text"
                    name="name"
                    id="myName"
                    className="w-full text-[#F97300] p-3 rounded-lg border-2 border-[#F97300] bg-[#E2DFD0] placeholder-[#f974007a] focus:outline-none font-semibold text-center"
                    placeholder="Enter Your Name"
                  />
                  <RedErrorMessage name="name" />
                </div>
              )}

              <div className="mb-4">
                <label
                  htmlFor="myPassword"
                  className="block text-[#F97300] font-bold mb-2"
                >
                  Password:
                </label>
                <Field
                  type="password"
                  name="password"
                  id="myPassword"
                  className="w-full text-[#F97300] p-3 rounded-lg border-2 border-[#F97300] bg-[#E2DFD0] placeholder-[#f974007a] focus:outline-none font-semibold text-center"
                  placeholder="Enter Your Password"
                />
                <RedErrorMessage name="password" />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="myEmail"
                  className="block text-[#F97300] font-bold mb-2"
                >
                  Email:
                </label>
                <Field
                  type="email"
                  name="email"
                  id="myEmail"
                  className="w-full text-[#F97300] p-3 rounded-lg border-2 border-[#F97300] bg-[#E2DFD0] placeholder-[#f974007a] focus:outline-none font-semibold text-center"
                  placeholder="Enter Your Email"
                />
                <RedErrorMessage name="email" />
              </div>

              <button
                type="submit"
                className="w-full bg-[#F97300] text-[#E2DFD0] font-semibold py-3 rounded-lg border-2 border-transparent hover:border-[#F97300] hover:bg-[#E2DFD0] hover:text-[#F97300] transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-base"
                disabled={isLoading || isSubmitting}
              >
                {isLoading ? "Processing..." : isLogin ? "Login" : "Signup"}
              </button>

              {isLoading && (
                <div className="w-full bg-[#F97300]/20 h-2 rounded-full overflow-hidden mt-2">
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
            </Form>
          )}
        </Formik>

        {formError && (
          <h1 className="text-center text-[#DC143C] text-lg font-semibold mt-4">
            {isLogin ? "Invalid credentials!" : "Email already exists!"}
          </h1>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm font-semibold text-[#F97300] hover:underline"
          >
            {isLogin
              ? "Don't have an account? Signup"
              : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
