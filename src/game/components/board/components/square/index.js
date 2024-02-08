import { SquareWrapper } from './SquareWrapper';

export const Square = ({ value, onClick, disabled }) => (
    <SquareWrapper className="square" player={value} onClick={onClick} disabled={disabled}>
        {value}
    </SquareWrapper>
);
