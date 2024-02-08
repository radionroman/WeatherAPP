import { createSelector } from '@reduxjs/toolkit'
import { GAME_HISTORY_REDUCER_NAME } from './reducer'

const selectGameHistory = (state) => state[GAME_HISTORY_REDUCER_NAME];

export const historySelector = createSelector(
    selectGameHistory,
    ({ history }) => history
);

export const currentItemSelector = createSelector(
    selectGameHistory,
    ({ currentItem }) => currentItem
);
