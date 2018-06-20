import { Map, fromJS } from "immutable";
import * as types from "../actions//types";
import isEmpty from "../validations/is-empty";

const initialState = Map({
  isAuthenticated: false,
  user: Map()
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_CURRENT_USER:
      return state.update(state => {
        return state
          .set("isAuthenticated", !isEmpty(action.payload))
          .set("user", fromJS(action.payload));
      });
    default:
      return state;
  }
};

export default reducer;
