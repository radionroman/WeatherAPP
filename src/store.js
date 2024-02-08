import { configureStore } from "@reduxjs/toolkit";
import { createEpicMiddleware } from "redux-observable";

import {
  GAME_LOGIC_REDUCER_NAME,
  gameLogicReducer,
} from "./game/game-logic/reducer";
import {
  GAME_HISTORY_REDUCER_NAME,
  gameHistoryReducer,
} from "./game/components/game-history/reducer";
import { AI_REDUCER_NAME, gameLosetAiModegicReducer } from "./game/ai/reducer";
import {
  MAP_LOGIC_REDUCER_NAME,
  mapLogicReducer,
} from "./weatherapp/logic/reducer";

import { rootEpic } from "./epics";
import { aiReducer } from "./game/ai/reducer";

const epicMiddleware = createEpicMiddleware();

export const store = configureStore({
  reducer: {
    [GAME_LOGIC_REDUCER_NAME]: gameLogicReducer,
    [GAME_HISTORY_REDUCER_NAME]: gameHistoryReducer,
    [AI_REDUCER_NAME]: aiReducer,
    [MAP_LOGIC_REDUCER_NAME]: mapLogicReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(epicMiddleware),
});

epicMiddleware.run(rootEpic);
