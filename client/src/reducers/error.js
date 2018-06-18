import { Map } from "immutable";
import * as types from "../actions//types";

const initialState = Map({});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ERRORS:
      return state.merge(action.payload);

    default:
      return state;
  }
};

export default reducer;
