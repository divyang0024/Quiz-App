import * as Actions from "../redux/resultReducer";
import { postServerData } from "../helper/helper";
export const PushAnswer = (result) => async (dispatch) => {
  try {
    dispatch(Actions.pushResultAction(result));
  } catch (err) {
    console.log(err);
  }
};

export const updateResult = (index) => async (dispatch) => {
  try {
    dispatch(Actions.updateResultAction(index));
  } catch (err) {
    console.log(err);
  }
};

export const usePublishResult = (resultData) => {
  const { result, username } = resultData;
  (async () => {
    try {
      if (result != [] && !username) throw new Error("couldn't get result");
      await postServerData(
        "https://quiz-app-98y5-git-main-divyang0024s-projects.vercel.app/api/result",
        resultData,
        (data) => data
      );
    } catch (err) {
      console.log(err);
    }
  })();
};
