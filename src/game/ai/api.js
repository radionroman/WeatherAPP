import axios from 'axios';
import { API_URL } from '../../config';
import { FIELD_VALUES } from '../game-logic/const';

export const getNextMove = async (boardState) => {
    if (API_URL === undefined) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const nextMove = findFirstEmptyFieldIndex(boardState);
                resolve({ x: nextMove % 3, y: Math.floor(nextMove / 3) });
            }, 500);
        });
    }

    const board = boardState
        .flat(Infinity)
        .map((field) => (field === FIELD_VALUES.EMPTY ? '' : field));

    const response = await post(`${API_URL}/move`, {
        board: `[${board.map((value) => `"${value}"`).join(',')}]`
    });
    let { nextMove } = response.data;

    if (nextMove === undefined) {
        console.log('no response, making dummy move');
        nextMove = findFirstEmptyFieldIndex(boardState);
    }

    return nextMove;
};

const findFirstEmptyFieldIndex = (boardState) => boardState
    .flat(Infinity)
    .findIndex((field) => field === FIELD_VALUES.EMPTY);
