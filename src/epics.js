import { combineEpics } from "redux-observable";

import { mapEpics } from "./weatherapp/logic/epics";

export const rootEpic = combineEpics(mapEpics);
