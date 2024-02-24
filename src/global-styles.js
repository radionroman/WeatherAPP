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

         transition: background-color 0.5s, color 0.5s;

    }

    body {
         margin: ${({ theme }) => theme.dims.bigSpacing};

         transition: margin 0.5s;
    }
`;
