import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { FIELD_VALUES, MIN_BOARD_SIZE, MAX_BOARD_SIZE } from '../../game-logic/const';
import { boardSelector, isGameFinishedSelector, boardSizeSelector } from '../../game-logic/selectors';
import { makeMoveRequest, setBoardSize } from '../../game-logic/reducer';

import { Square, InputsWrapper } from './components';
import { aiModeSelector } from '../../ai/selectors';
import { AI_MODES } from '../../ai/const';
import { setAiMode } from '../../ai/reducer';

export const Board = () => {
    const board = useSelector(boardSelector);
    const isGameFinished = useSelector(isGameFinishedSelector);
    const boardSize = useSelector(boardSizeSelector);
    const aiMode = useSelector(aiModeSelector);

    const dispatch = useDispatch();

    const onFieldClick = (x, y) => dispatch(makeMoveRequest({ x, y }));
    const onSizeChange = (event) => {
        const value = event.target.value;
        const size = value === '' ? MIN_BOARD_SIZE : +value;
        dispatch(setBoardSize(Math.max(Math.min(size, MAX_BOARD_SIZE), MIN_BOARD_SIZE)));
    }
    const onModeChange = (event) => {
        const mode = event.target.value;
        dispatch(setAiMode(mode));
    }

    return (
        <div>
            {board.map((row, y) => (
                <div key={`row-${y}`} className="board-row">
                    {row.map((fieldValue, x) => (
                        <Square
                            key={`field-${x}-${y}`}
                            value={fieldValue}
                            onClick={() => onFieldClick(x, y)}
                            disabled={isGameFinished || (fieldValue !== FIELD_VALUES.EMPTY)}
                        />
                    ))}
                </div>
            ))}

            <InputsWrapper>
                <label>size:</label>
                <input
                    type="number"
                    min={MIN_BOARD_SIZE}
                    max={MAX_BOARD_SIZE}
                    value={boardSize}
                    onChange={onSizeChange}
                />

                <label>mode:</label>
                <select
                    value={aiMode}
                    onChange={onModeChange}
                    disabled={boardSize !== 3}>
                    <option value={AI_MODES.PLAYER_VS_PLAYER}>
                        player vs. player
                    </option>
                    <option value={AI_MODES.PLAYER_VS_AI}>player vs. ai</option>
                    <option value={AI_MODES.AI_VS_AI}>ai vs. ai</option>
                </select>
            </InputsWrapper>
        </div>
    );
}
