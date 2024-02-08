import { useSelector } from 'react-redux';

import { StatusWrapper } from './StatusWrapper';
import { currentPlayerSelector, winnerSelector, isGameFinishedSelector } from '../../game-logic/selectors';
import { PLAYERS } from "../../game-logic/const";

export const Status = () => {
    const currentPlayer = useSelector(currentPlayerSelector);
    const winner = useSelector(winnerSelector);
    const isGameFinished = useSelector(isGameFinishedSelector);

    let message = `Current player: ${currentPlayer}`;

    if (isGameFinished) {
        message = winner !== PLAYERS.UNKNOWN ? `Winner: ${winner}` : 'A draw';
    }

    return (
        <StatusWrapper currentPlayer={currentPlayer} isGameFinished={isGameFinished} winner={winner}>
            {message}
        </StatusWrapper>
    );
};
