import { Map, Chart, MapWrapper, darkTheme, lightTheme } from "./components";
import { useSelector, useDispatch } from "react-redux";
import { toggleMode } from "./logic/reducer";
import { modeSelector } from "./logic/selectors";
import { ThemeProvider } from "styled-components";



export const WeatherApp = () => {
    const darkMode = useSelector(modeSelector);
    const dispatch = useDispatch();

    return (

        <ThemeProvider theme={darkMode ? darkTheme: lightTheme}>
     
        <h1>Weather App</h1>
        <button onClick={() => dispatch(toggleMode())}>
                {darkMode ? "Light mode" : "Dark mode"}
        </button>
        <MapWrapper>
            <Map />
        </MapWrapper>
        
        <Chart />

        </ThemeProvider>
        
    );
}
