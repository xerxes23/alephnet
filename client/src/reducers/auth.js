import { Map, List } from "immutable";

const initialState = {
  auth: false,
  user: Map({})
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;
