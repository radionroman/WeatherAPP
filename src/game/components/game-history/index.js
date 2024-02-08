import { useSelector, useDispatch } from 'react-redux';

import { HistoryWrapper, HistoryItem } from './components';
import { historySelector, currentItemSelector } from './selectors';
import { loadSnapshot } from './reducer';

export const GameHistory = () => {
    const history = useSelector(historySelector);
    const currentItem = useSelector(currentItemSelector);
    const dispatch = useDispatch();

    const goToSnapshot = (snapshot) => dispatch(loadSnapshot(snapshot));

    return (
        <HistoryWrapper>
            {history.map((historyItem) => (
                <HistoryItem
                    key={`history-item-${historyItem.moveNumber}`}
                    player={historyItem.snapshot.currentPlayer}
                    moveNumber={historyItem.moveNumber}
                    emph={currentItem === historyItem.moveNumber}
                    onClick={() => goToSnapshot(historyItem)}
                />
            ))}
        </HistoryWrapper>
    );
};
