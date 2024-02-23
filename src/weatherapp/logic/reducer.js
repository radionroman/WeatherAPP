import { createSlice, createAction} from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { BBOX, CITIES, WEATHER } from "./const";

export const MAP_LOGIC_REDUCER_NAME = "mapLogic";

const initialState = {
  bbox: BBOX,
  weatherData: WEATHER,
  userLocation: [51.5074, -0.1278],
  darkMode: false,
};

function adjustCoordinates(longitude) {
  while (longitude > 180) {

      longitude -= 360;
  }
  while (longitude < -180) {

      longitude += 360;
  }
  return longitude;
}


const mapLogicSlice = createSlice({
  name: MAP_LOGIC_REDUCER_NAME,
  initialState,
  reducers: {
    fetchDataSuccess: (state, action) => {  
      state.weatherData = action.payload;
    },
    updateBBox: (state, { payload }) => {
      state.bbox._northEast.lat = adjustCoordinates(payload.lat);
      state.bbox._northEast.lng = adjustCoordinates(payload.lng);
      state.bbox._southWest.lat = adjustCoordinates(payload.lat2);
      state.bbox._southWest.lng = adjustCoordinates(payload.lng2);
    },
    setUserLocation: (state, action) => {
      state.userLocation = [action.payload.coords.latitude, action.payload.coords.longitude];
    },
    toggleMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    fetchWeatherError: (error) => {
      console.error("Error fetching weather data", error);
    },
    fetchOverpassError: (error) => {
      console.error("Error fetching overpass data", error);
    },

  }
});

export const fetchWeatherDataRequest = createAction(
  `${MAP_LOGIC_REDUCER_NAME}/fetchWeatherDataRequest`
);
export const fetchOverpassDataRequest = createAction(
  `${MAP_LOGIC_REDUCER_NAME}/fetchOverpassDataRequest`
);

export const fetchDataRequest = createAction(
  `${MAP_LOGIC_REDUCER_NAME}/fetchDataRequest`
);

export const setUserLocationRequest = createAction(
  `${MAP_LOGIC_REDUCER_NAME}/setUserLocationRequest`
);

export const { fetchDataSuccess,updateBBox, setUserLocation, toggleMode, fetchWeatherError, fetchOverpassError } = mapLogicSlice.actions;

export const mapLogicReducer = mapLogicSlice.reducer;
