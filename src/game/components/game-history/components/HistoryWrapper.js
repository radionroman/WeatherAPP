import styled from 'styled-components';

export const HistoryWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;

    width: ${({ theme }) => theme.dims.history.width};
`;
