import { 
    GameWrapper, GameInfoWrapper,
    Board, GameHistory, Status
 } from './components';

export const Game = () => (
    <GameWrapper>
        <Board />

        <GameInfoWrapper>
            <Status />

            <GameHistory />
        </GameInfoWrapper>
    </GameWrapper>
);