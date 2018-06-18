import { Map } from "immutable";
import * as types from "../actions//types";
import isEmpty from "../validations/is-empty";

const initialState = Map({
  auth: false,
  user: Map()
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_CURRENT_USER:
      return state.update(state => {
        return state
          .set("auth", !isEmpty(action.payload))
          .set("user", Map(action.payload));
      });
    default:
      return state;
  }
};

export default reducer;
