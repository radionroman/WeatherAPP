import { createSelector } from '@reduxjs/toolkit';
import { AI_REDUCER_NAME } from './reducer';

const getAiReducerState = (state) => state[AI_REDUCER_NAME];

export const aiModeSelector = createSelector(
    getAiReducerState,
    ({ mode }) => mode
);

export const aiPlayersSelector = createSelector(
    getAiReducerState,
    ({ aiPlayers }) => aiPlayers
);
