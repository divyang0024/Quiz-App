import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { IsSignedUp } from "../helper/helper.js";

//components import
import Home from "./Home";
import Quiz from "./Quiz";
import Result from "./Result";
import SignUp from "./SignUp";
import ResultTable from "./ResultTable.jsx";

//routes
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <IsSignedUp>
        <Home />
      </IsSignedUp>
    ),
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/quiz",
    element: <Quiz />,
  },
  {
    path: "/result",
    element: <Result />,
  },
  {
    path: "/logs",
    element: <ResultTable />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
