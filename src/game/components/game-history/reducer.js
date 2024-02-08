import { createSlice } from '@reduxjs/toolkit'

export const GAME_HISTORY_REDUCER_NAME = 'gameHistory';

const initialState = {
    history: [],
    currentItem: -1
}

const gameHistorySlice = createSlice({
    name: GAME_HISTORY_REDUCER_NAME,
    initialState,
    reducers: {
        updateHistory: (state, { payload }) => {
            const { history, currentItem } = state;

            history.splice(
                currentItem + 1,
                history.length - (currentItem + 1),
                { 
                    snapshot: payload,
                    moveNumber: currentItem + 1
                }
            );

            state.currentItem += 1;
        },
        loadSnapshot: (state, { payload }) => {
            state.currentItem = payload.moveNumber;
        },
        resetHistory: (state) => {
            state.history = [];
            state.currentItem = -1;
        }
    }
});

export const { updateHistory, loadSnapshot, resetHistory } = gameHistorySlice.actions;

export const gameHistoryReducer = gameHistorySlice.reducer;

