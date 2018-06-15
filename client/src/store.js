import { createStore, applyMiddleware, compose } from "redux";
import { Map, List } from "immutable";
import thunk from "redux-thunk";
import rootReducers from "./reducers";

const middlewares = [thunk];
const middleware = applyMiddleware(...middlewares);

const initialState = Map({});

const store = createStore(
  rootReducers,
  compose(
    middleware,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
