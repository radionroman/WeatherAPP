import { Map, Chart, MapWrapper, ChartWrapper, FormComponent} from "./components";
import { useSelector, useDispatch } from "react-redux";
import { toggleMode } from "./logic/reducer";
import { modeSelector, isLoadingSelector} from "./logic/selectors";
import styled, { ThemeProvider } from "styled-components";
import {  Oval } from 'react-loader-spinner';

const MapChartContainer = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;
  height: 70vh;
  margin-bottom: 20px;
`;

const TopRightAudioContainer = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 999; 
`;

const FormContainer = styled.div`


  align-items: center;
  padding: 20px;
  border: 1px solid ${({theme}) => (theme.colors.border)};
  border-radius: 10px;
  width: 95%;
  height: 7vh;
  
`;


const UpperBarContainer = styled.div`

  display: flex;
  height: 10vh;
  margin: 0 auto;

`;



export const WeatherApp = () => {
  const darkMode = useSelector(modeSelector);
  const isLoading = useSelector(isLoadingSelector);
  const dispatch = useDispatch();

  return (
    <div>
      <UpperBarContainer>
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
      </UpperBarContainer>
      <button onClick={() => dispatch(toggleMode())}>
        {darkMode ? "Light mode" : "Dark mode"}
      </button>

      <MapChartContainer>

        <MapWrapper>
          <Map />
        </MapWrapper>

        <ChartWrapper>
          <Chart />
        </ChartWrapper>

      </MapChartContainer>

      <FormContainer>
       <FormComponent />
            </FormContainer>
    </div>
  );
};
