import { configureStore } from "@reduxjs/toolkit";
import { createEpicMiddleware } from "redux-observable";

import {
  MAP_LOGIC_REDUCER_NAME,
  mapLogicReducer,
} from "./weatherapp/logic/reducer";

import { rootEpic } from "./epics";
const epicMiddleware = createEpicMiddleware();

export const store = configureStore({
  reducer: {

    [MAP_LOGIC_REDUCER_NAME]: mapLogicReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(epicMiddleware),
});

epicMiddleware.run(rootEpic);
