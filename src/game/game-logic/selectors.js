import { createSelector } from "@reduxjs/toolkit";
import { PLAYERS, FIELD_VALUES } from "./const";
import { GAME_LOGIC_REDUCER_NAME } from "./reducer";
import { calculateWinner } from "./logic";

export const selectGameState = (state) => state[GAME_LOGIC_REDUCER_NAME];

export const boardSelector = createSelector(
  selectGameState,
  ({ board }) => board
);

export const currentPlayerSelector = createSelector(
  selectGameState,
  ({ currentPlayer }) => currentPlayer
);

export const boardSizeSelector = createSelector(
  selectGameState,
  ({ boardSize }) => boardSize
);

export const winnerSelector = createSelector(
  boardSelector,
  boardSizeSelector,
  (board, boardSize) => calculateWinner(board, boardSize)
);

export const isGameFinishedSelector = createSelector(
  winnerSelector,
  boardSelector,
  (winner, board) =>
    winner !== PLAYERS.UNKNOWN ||
    board
      .flat(Infinity)
      .reduce(
        (allTaken, currentField) =>
          allTaken && currentField !== FIELD_VALUES.EMPTY,
        true
      )
);
