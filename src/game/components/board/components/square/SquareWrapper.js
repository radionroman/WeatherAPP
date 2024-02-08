import styled from 'styled-components';

export const SquareWrapper = styled.button`
    color: ${({ theme, player }) => theme.colors.players[player]};
    border: 1px solid ${({ theme }) => theme.colors.border};

    float: left;

    font-size: ${({ theme }) => theme.fonts.board.fontSize};
    font-weight: ${({ theme }) => theme.fonts.board.fontWeight};
    line-height: ${({ theme }) => theme.fonts.board.lineHeight};

    height: ${({ theme }) => theme.fonts.board.lineHeight};
    width: ${({ theme }) => theme.fonts.board.lineHeight};

    margin-right: -1px;
    margin-top: -1px;
    padding: 0;
    text-align: center;

    cursor: ${({ disabled }) => disabled ? 'default' : 'pointer'};

    outline: none;

    &:hover {
        background: ${({ disabled, theme }) => disabled
             ? theme.colors.background
             : theme.colors.board.hoverBackground
        };
    }
`;
