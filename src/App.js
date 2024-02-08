import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import { GlobalStyle } from "./global-styles";
import { Game } from "./game";
import { WeatherApp } from "./weatherapp";

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <WeatherApp />
    </ThemeProvider>
  );
};
