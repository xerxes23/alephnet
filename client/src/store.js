import { createStore, applyMiddleware, compose } from "redux";
import { Map } from "immutable";
import thunk from "redux-thunk";
import rootReducers from "./reducers";

// Middleware
const middlewares = [thunk];
const middleware = applyMiddleware(...middlewares);

// Store
const store = createStore(
  rootReducers,
  compose(
    middleware,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
