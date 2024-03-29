import { createSelector } from "@reduxjs/toolkit";
import { MAP_LOGIC_REDUCER_NAME } from "./reducer";

export const selectMapState = (state) => state[MAP_LOGIC_REDUCER_NAME];

export const bboxSelector = createSelector(selectMapState, ({ bbox }) => bbox);

export const citiesSelector = createSelector(selectMapState, ({ overpassData }) => overpassData);

export const weatherSelector = createSelector(selectMapState, ({ weatherData }) => weatherData);

export const modeSelector = createSelector(selectMapState, ({ darkMode }) => darkMode);

export const currentCitiesSelector = createSelector(selectMapState, ({ currentCities }) => currentCities);

export const filtersSelector = createSelector(selectMapState, ({ filters }) => filters);

export const isLoadingSelector = createSelector(selectMapState, ({ isLoading }) => isLoading);