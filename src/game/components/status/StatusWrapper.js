import styled from 'styled-components';

export const StatusWrapper = styled.div`
    color: ${({ theme, currentPlayer, isGameFinished, winner }) =>
        theme.colors.players[isGameFinished ? winner : currentPlayer]};
    padding: 0 ${({ theme }) => theme.dims.basicSpacing} ${({ theme }) => theme.dims.basicSpacing};
    text-align: center;
`;

