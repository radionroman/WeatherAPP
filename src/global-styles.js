import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    html,
    body,
    #root {
         width: 100%;
         height: 100%;
        
         color: ${({ theme }) => theme.colors.text};
         background-color: ${({ theme }) => theme.colors.background};
        
         font-size: ${({ theme }) => theme.fonts.basic.fontSize};
         font-family: ${({ theme }) => theme.fonts.basic.fontFamily};
    }

    body {
         margin: ${({ theme }) => theme.dims.bigSpacing};
    }
`;
