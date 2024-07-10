import React from "react";
import { ErrorMessage } from "formik";

function redErrorMessage({ name }) {
  return (
    <div className="text-[#DC143C] font-semibold">
      <ErrorMessage name={name} />
    </div>
  );
}

export default redErrorMessage;
