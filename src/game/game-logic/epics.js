import { ofType, combineEpics } from "redux-observable";
import { map, startWith, filter } from "rxjs/operators";

import { makeMove, makeMoveRequest, setBoardSize } from "./reducer";
import { selectGameState, currentPlayerSelector } from "./selectors";
import { aiPlayersSelector } from "../ai/selectors";
import {
  resetHistory,
  updateHistory,
} from "../components/game-history/reducer";

const validateMakeMoveRequestEpic = (action$, state$) =>
  action$.pipe(
    ofType(makeMoveRequest.type),
    map(({ payload }) => ({
      currentPlayer: currentPlayerSelector(state$.value),
      aiPlayers: aiPlayersSelector(state$.value),
      payload,
    })),
    filter(
      ({ currentPlayer, aiPlayers }) => !aiPlayers.includes(currentPlayer)
    ),
    map(({ payload }) => makeMove(payload))
  );

const updateHistoryOnMoveEpic = (action$, state$) =>
  action$.pipe(
    ofType(makeMove.type, resetHistory.type),
    startWith("I'm here just for init and my value will be ignored"),
    map(() => selectGameState(state$.value)),
    map((gameState) => updateHistory(gameState))
  );

const resetHistoryEpic = (action$) =>
  action$.pipe(
    ofType(setBoardSize.type),
    map(() => resetHistory())
  );

export const gameEpics = combineEpics(
  validateMakeMoveRequestEpic,
  updateHistoryOnMoveEpic,
  resetHistoryEpic
);
