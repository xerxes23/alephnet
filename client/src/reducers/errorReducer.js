import * as types from "../actions//types";

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ERRORS:
      return {
        ...action.payload
      };

    default:
      return state;
  }
};

export default reducer;
