import * as types from "./types";
import axios from "axios";

export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(() => history.push("/login"))
    .catch(err =>
      dispatch({
        type: types.GET_ERRORS,
        payload: err.response.data
      })
    );
};
