import * as types from "./types";

export const registerUser = userData => ({
  type: types.TEST_DISPATCH,
  payload: userData
});
