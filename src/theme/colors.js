import { PLAYERS } from '../game/game-logic/const';

export const lightColors = {
    background: '#FFFFFF',
    text: '#000000',
    border: '#999999',

    players: {
        [PLAYERS.X]: '#FFB135',
        [PLAYERS.O]: '#3583ff',
        [PLAYERS.UNKNOWN]: '#5b5b5b'
    },

    board: {
        hoverBackground: '#dddddd'
    }
};

export const darkColors = {
    background: '#000000',
    text: '#FFFFFF',
    border: '#666666',
};
