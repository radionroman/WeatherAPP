import { createSlice } from '@reduxjs/toolkit';
import { AI_MODES } from './const';
import { PLAYERS } from '../game-logic/const';

export const AI_REDUCER_NAME = 'ai';

const initialState = {
    mode: AI_MODES.PLAYER_VS_PLAYER,
    aiPlayers: []
};

const aiSlice = createSlice({
    name: AI_REDUCER_NAME,
    initialState,
    reducers: {
        setAiMode: (state, { payload }) => {
            const players = [];
            switch (payload) {
                case AI_MODES.PLAYER_VS_AI:
                    players.push(PLAYERS.O);
                    break;
                case AI_MODES.AI_VS_AI:
                    players.push(PLAYERS.O);
                    players.push(PLAYERS.X);
                    break;
            }
            
            state.mode = payload;
            state.aiPlayers = players;
        }
    }
});

export const { setAiMode } = aiSlice.actions;

export const aiReducer = aiSlice.reducer;
