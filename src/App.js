import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import { GlobalStyle } from "./global-styles";
import { WeatherApp } from "./weatherapp";
import { modeSelector } from "./weatherapp/logic/selectors";
import { useSelector } from "react-redux";


export const App = () => {
  const darkMode = useSelector(modeSelector);
  
  return (
    <ThemeProvider theme={darkMode ? theme : theme}>
      <GlobalStyle />
      <WeatherApp />
    </ThemeProvider>
  );
};
