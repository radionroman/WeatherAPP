import { HistoryItemWrapper } from './HistoryItemWrapper';

export const HistoryItem = ({ moveNumber, emph, player, onClick }) => (
    <HistoryItemWrapper player={player} emph={emph} onClick={onClick}>
        {moveNumber > 0 ? `Go to move #${moveNumber}` : 'Go to game start'}
    </HistoryItemWrapper>
);
