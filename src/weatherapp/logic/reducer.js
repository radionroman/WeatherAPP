import { createSlice, createAction} from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { BBOX, CITIES, WEATHER } from "./const";

export const MAP_LOGIC_REDUCER_NAME = "mapLogic";

const initialState = {
  bbox: BBOX,
  weatherData: WEATHER,
  userLocation: [51.5074, -0.1278],
  darkMode: false,
  filters: {
    min_population: 0,
    max_population: 1000000000,
    name: "",
  },
  currentCities: [],
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
      var currentCities = action.payload.newCities;
      var newWeatherData = action.payload.cities;
      var oldWeatherData = state.weatherData;
      var data = [];
      currentCities.forEach((city) => {
        var oldCity = oldWeatherData.find((element) => element.name === city.name);
        if (oldCity !== undefined) {
          data.push(oldCity);
        } else {
          var newCity = newWeatherData.find((element) => element.name === city.name);
          data.push(newCity);
        }
      });
      console.log("Data", data);
      state.weatherData = data;
    },
    deleteCities: (state, action) => {
      const data = action.payload;
      console.log("Data", data);
      
      state.weatherData = state.weatherData.filter((city) => data.find((element) => element.name === city.name) != undefined);
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
    setCurrentCities: (state, action) => {
      state.currentCities = action.payload;
      console.log("Current Cities", state.currentCities);
    },

    setFilters: (state, action) => {
      const {min_population, max_population, name} = action.payload;
      state.filters.min_population = min_population;
      state.filters.max_population = max_population;
      state.filters.name = name;
    }

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

export const { deleteCities, setCurrentCities,fetchDataSuccess,updateBBox, setUserLocation, toggleMode, fetchWeatherError, fetchOverpassError, setFilters } = mapLogicSlice.actions;

export const mapLogicReducer = mapLogicSlice.reducer;
