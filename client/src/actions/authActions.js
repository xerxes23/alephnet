import * as types from "./types";
import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";

// Register user

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

// Login user - Get token

export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      const { token } = res.data;
      // Save to local storage
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: types.GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setCurrentUser = decoded => ({
  type: types.SET_CURRENT_USER,
  payload: decoded
});
