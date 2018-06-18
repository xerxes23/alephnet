import { Map, List } from "immutable";
import * as types from "../actions//types";

const initialState = Map({
  auth: false,
  user: Map({})
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TEST_DISPATCH:
      return state.update("user", user => {
        return Map(action.payload);
      });

    default:
      return state;
  }
};

export default reducer;
