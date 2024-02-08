import { ofType, combineEpics } from 'redux-observable';
import { from } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
import { makeMove, setBoardSize } from '../game-logic/reducer';
import { setAiMode } from './reducer';
import { boardSelector, currentPlayerSelector, isGameFinishedSelector } from '../game-logic/selectors';
import { aiPlayersSelector } from './selectors';
import { AI_SUPPORTED_BOARD_SIZE } from './const';
import { AI_MODES } from './const';
import { getNextMove } from './api';

const aiMoveEpic = (action$, state$) =>
    action$.pipe(
        ofType(makeMove.type, setAiMode.type),
        map(() => ({
            isGameFinished: isGameFinishedSelector(state$.value),
            aiPlayers: aiPlayersSelector(state$.value),
            currentPlayer: currentPlayerSelector(state$.value)
        })),
        filter(
            ({ isGameFinished, aiPlayers, currentPlayer }) =>
                !isGameFinished 
                && aiPlayers.includes(currentPlayer)
        ),
        map(() => boardSelector(state$.value)),
        switchMap((board) =>
            from(getNextMove(board)).pipe(
                map(({ x, y }) => makeMove({ x, y }))
            )
        )
    );

const resetModeOnBoardSizeChangeEpic = (action$) =>
    action$.pipe(
        ofType(setBoardSize.type),
        map(({ size }) => size),
        filter((size) => size !== AI_SUPPORTED_BOARD_SIZE),
        map(() => setAiMode(AI_MODES.PLAYER_VS_PLAYER))
    );

export const aiEpics = combineEpics(
    aiMoveEpic, 
    resetModeOnBoardSizeChangeEpic
);
