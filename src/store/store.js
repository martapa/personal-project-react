

import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import { rootReducer } from "./app.reducer";
import { composeWithDevTools } from "redux-devtools-extension";


// Add Redux middleware:
//    - thunks

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(reduxThunk))
);
