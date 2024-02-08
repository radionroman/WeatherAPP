import styled from 'styled-components';

export const HistoryItemWrapper = styled.button`
    background: ${({ theme }) => theme.colors.background};
    border-width: ${({ emph }) => emph ? '2px' : '1px'};
    border-color: ${({ player, emph, theme }) => emph
        ? theme.colors.players[player]
        : theme.colors.border
    };
    color: ${({ player, theme }) => theme.colors.players[player]};
    border-radius: 0;

    padding: ${({ theme }) => theme.dims.basicSpacing} ${({ theme }) => theme.dims.smallSpacing};
    font-weight: bold;

    opacity: ${({ emph }) => emph ? 1 : 0.7};

    outline: none;
    cursor: ${({ emph }) => emph ? 'default' : 'pointer'};

    &:hover {
        opacity: 1;
    }
`;
