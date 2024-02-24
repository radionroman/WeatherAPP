import { Map, Chart, MapWrapper, darkTheme, lightTheme, ChartWrapper } from "./components";
import { useSelector, useDispatch } from "react-redux";
import { toggleMode } from "./logic/reducer";
import { modeSelector } from "./logic/selectors";
import styled, { ThemeProvider } from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center; /* Optional: Align the container's content */
`;

const Box = styled.div`

`;
export const WeatherApp = () => {
    const darkMode = useSelector(modeSelector);
    const dispatch = useDispatch();

    return (
        

        <ThemeProvider theme={darkMode ? darkTheme: lightTheme}>
            <h1>Weather App</h1>
            <button onClick={() => dispatch(toggleMode())}>
                {darkMode ? "Light mode" : "Dark mode"}
            </button>
            <Container>
                
                <MapWrapper>
                    <Map />
                </MapWrapper>
                
                
                <ChartWrapper>
                <Chart />
                </ChartWrapper>
            </Container>
        </ThemeProvider>
        
    );
}
