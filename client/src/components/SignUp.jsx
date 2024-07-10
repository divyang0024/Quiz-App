import React, { useState } from "react";
import RedErrorMessage from "./RedErrorMessage";
import { Form, Formik, Field } from "formik";
import { useNavigate } from "react-router";
import { generateToken } from "../helper/helper.js";
import * as yup from "yup";
import Cookies from "js-cookie";
import axios from "axios";

function SignUp() {
  const [formError, setFormError] = useState(false);
  const redirectToHome = useNavigate();
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const formSchema = yup.object({
    name: yup
      .string("must start from a character")
      .min(3)
      .max(20)
      .required("cannot leave name field empty"),
    password: yup
      .string("must be string")
      .min(8)
      .required("cannot leave password field empty"),
    email: yup
      .string()
      .matches(emailRegex, "not a valid email")
      .required("cannot leave email field empty"),
  });

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-[#32012F]">
        <div className="bg-[#E2DFD0] p-8 rounded-xl border-2 border-[#F97300]">
          <Formik
            initialValues={{
              name: "",
              password: "",
              email: "",
            }}
            validationSchema={formSchema}
            onSubmit={async ({ name, password, email }) => {
              const response = await axios.post(
                "http://localhost:3000/user/getUsers",
                { email: email }
              );
              if (response.data.msg) {
                setFormError(true);
                setTimeout(() => {
                  setFormError(false);
                }, 2000);
              } else {
                await axios
                  .post("http://localhost:3000/user/registerUser", {
                    name,
                    email,
                    password,
                  })
                  .then(async (data) => {
                    try {
                      const token = await generateToken({
                        name: data.data.name,
                        email: data.data.email,
                      });
                      Cookies.set("uid", token);
                      redirectToHome("/", { replace: true });
                    } catch (err) {
                      console.log(err);
                    }
                  });
              }
            }}
          >
            <Form className="flex flex-col gap-4">
              <h1 className="text-[#F97300] font-semibold text-4xl mb-4">
                Signup
              </h1>
              <ul className="flex flex-col md:flex-row gap-2 md:gap-20 md:justify-between md:items-center">
                <label htmlFor="myName" className="text-[#F97300] font-bold">
                  Name :
                </label>
                <Field
                  type="text"
                  name="name"
                  id="myName"
                  className="text-[#F97300] p-1 rounded-lg border-2 border-[#F97300] bg-[#E2DFD0] placeholder-[#f974007a] focus:outline-none font-semibold text-center"
                  placeholder="Enter Your Name"
                ></Field>
              </ul>
              <RedErrorMessage name="name" />
              <ul className="flex flex-col md:flex-row gap-2 md:justify-between md:items-center">
                <label
                  htmlFor="myPassword"
                  className="text-[#F97300] font-bold"
                >
                  Password :
                </label>
                <Field
                  type="password"
                  name="password"
                  id="myPassword"
                  className="text-[#F97300] p-1 rounded-lg border-2 border-[#F97300] bg-[#E2DFD0] placeholder-[#f974007a] focus:outline-none font-semibold text-center"
                  placeholder="Enter Your Password"
                ></Field>
              </ul>
              <RedErrorMessage name="password" />
              <ul className="flex flex-col md:flex-row gap-2 md:justify-between md:items-center">
                <label htmlFor="myEmail" className="text-[#F97300] font-bold">
                  Email :
                </label>
                <Field
                  type="email"
                  name="email"
                  id="myEmail"
                  className="text-[#F97300] p-1 rounded-lg border-2 border-[#F97300] bg-[#E2DFD0] placeholder-[#f974007a] focus:outline-none font-semibold text-center"
                  placeholder="Enter Your Email"
                ></Field>
              </ul>
              <RedErrorMessage name="email" />
              <button
                type="submit"
                className="bg-[#F97300] border-2 border-transparent font-semibold text-[#E2DFD0] px-4 py-2 rounded-lg hover:border-[#F97300] hover:bg-[#E2DFD0] hover:text-[#F97300] duration-300 self-end mt-4 md:self-auto"
              >
                Submit
              </button>
            </Form>
          </Formik>
          {formError && (
            <h1 className=" text-center text-[#DC143C] text-lg font-semibold mt-4">
              Email already exists!!!!.
            </h1>
          )}
        </div>
      </div>
    </>
  );
}

export default SignUp;
