import { Map, Chart, MapWrapper, darkTheme, lightTheme, ChartWrapper, FormComponent} from "./components";
import { useSelector, useDispatch } from "react-redux";
import { toggleMode } from "./logic/reducer";
import { modeSelector, isLoadingSelector} from "./logic/selectors";
import styled, { ThemeProvider } from "styled-components";
import {  Oval } from 'react-loader-spinner';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;
  height: 80vh;
`;

const TopRightAudioContainer = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 999; 
`;

export const WeatherApp = () => {
  const darkMode = useSelector(modeSelector);
  const isLoading = useSelector(isLoadingSelector);
  const dispatch = useDispatch();

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <h1>Weather App</h1>
      {isLoading && (
        <TopRightAudioContainer>
          <Oval
            height={80}
            width={80}
            radius={9}
            color="green"
            ariaLabel="loading"
          />
        </TopRightAudioContainer>
      )}
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
      <FormComponent />
    </ThemeProvider>
  );
};
