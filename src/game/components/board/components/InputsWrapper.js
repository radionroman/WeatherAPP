import styled from 'styled-components';

export const InputsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;

    width: 100%;

    padding-top: ${({ theme } ) => theme.dims.basicSpacing};
`;
