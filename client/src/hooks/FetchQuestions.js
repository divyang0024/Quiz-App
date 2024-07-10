import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as Actions from "../redux/questionReducer.js";
import { getServerData } from "../helper/helper.js";

export const useFetchQuestion = () => {
  const [getData, setGetData] = useState({
    isLoading: false,
    apiData: [],
    serverError: null,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    setGetData((prev) => ({ ...prev, isLoading: true }));
    //async function to fetch backend data.
    (async () => {
      try {
        // const questions = await data;
        const q = await getServerData(
          "http://localhost:3000/api/questions"
        ).then((data) => {
          return data;
        });
        let questions = [];

        let indices = new Set();
        while (questions.length < 10 && indices.size < q.length) {
          const index = Math.floor(Math.random() * q.length);
          if (!indices.has(index)) {
            indices.add(index);
            questions.push(q[index]);
          }
        }

        if (questions.length > 0) {
          setGetData((prev) => ({
            ...prev,
            isLoading: false,
          }));

          setGetData((prev) => ({
            ...prev,
            apiData: questions,
          }));

          dispatch(Actions.startExamAction(questions));
        } else {
          throw new Error("No Question Available");
        }
      } catch (err) {
        setGetData((prev) => ({
          ...prev,
          isLoading: false,
        }));
        setGetData((prev) => ({
          ...prev,
          serverError: err,
        }));
      }
    })();
  }, [dispatch]);
  return [getData, setGetData];
};

export const moveNextQuestion = () => async (dispatch) => {
  try {
    dispatch(Actions.moveNextAction());
  } catch (err) {
    console.log(err);
  }
};

export const movePrevQuestion = () => async (dispatch) => {
  try {
    dispatch(Actions.movePrevAction());
  } catch (err) {
    console.log(err);
  }
};
