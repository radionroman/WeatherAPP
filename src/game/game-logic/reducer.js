import { createSlice, createAction } from "@reduxjs/toolkit";
import {
  FIELD_VALUES,
  PLAYERS,
  STARTING_PLAYER,
  DEFAULT_BOARD_SIZE,
} from "./const";
import { generateBoard } from "./logic";
import { loadSnapshot } from "../components/game-history/reducer";

export const GAME_LOGIC_REDUCER_NAME = "gameLogic";

const initialState = {
  board: generateBoard(DEFAULT_BOARD_SIZE),
  currentPlayer: STARTING_PLAYER,
  boardSize: DEFAULT_BOARD_SIZE,
};

const gameLogicSlice = createSlice({
  name: GAME_LOGIC_REDUCER_NAME,
  initialState,
  reducers: {
    makeMove: (state, { payload }) => {
      const { x, y } = payload;
      const { board, currentPlayer } = state;

      if (state.isGameFinished) {
        console.error("Move attempt after the game is finished");
        return;
      }

      if (board[y][x] !== FIELD_VALUES.EMPTY) {
        console.error(`Move attempt to a taken field: (${x}, ${y})`);
        return;
      }

      board[y][x] = currentPlayer;
      state.currentPlayer = currentPlayer === PLAYERS.X ? PLAYERS.O : PLAYERS.X;
    },
    setBoardSize: (state, { payload }) => {
      state.board = generateBoard(payload);
      state.currentPlayer = STARTING_PLAYER;
      state.boardSize = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadSnapshot, (state, { payload }) => {
      state.board = payload.snapshot.board;
      state.currentPlayer = payload.snapshot.currentPlayer;
    });
  },
});

export const makeMoveRequest = createAction(
  `${GAME_LOGIC_REDUCER_NAME}/makeMoveRequest`
);

export const { makeMove, setBoardSize } = gameLogicSlice.actions;

export const gameLogicReducer = gameLogicSlice.reducer;
