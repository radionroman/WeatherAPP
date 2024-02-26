import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters, fetchDataRequest, setIsLoadingRequest } from '../../../../logic/reducer';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { filtersSelector } from '../../../../logic/selectors';
import styled from 'styled-components';



export const FormComponent = () => {
  const dispatch = useDispatch();

  // Using useSelector to get values from the Redux store
  const filters = useSelector(filtersSelector);
  const { min_population, max_population } = filters;
  const name = filters.name;
  const populationRange = [min_population, max_population];

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    dispatch(setFilters({ name: newValue, min_population, max_population}));
    dispatch(setIsLoadingRequest(true));
    dispatch(fetchDataRequest());
  };

  const handleInputChangeSlider = (newPopulationRange) => {
    dispatch(setFilters({
      name,
      min_population: newPopulationRange[0],
      max_population: newPopulationRange[1],
    }));
    dispatch(setIsLoadingRequest(true));
    dispatch(fetchDataRequest());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setIsLoadingRequest(true));
    dispatch(fetchDataRequest());
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Filter by name:
        <input
          type="text"
          onChange={handleInputChange}
        />
      </label>
      <div>
        <div>
          Population Range: {populationRange[0]} - {populationRange[1]}
        </div>
        <RangeSlider
          min={0}
          max={20000000}
          value={populationRange}
          onInput={handleInputChangeSlider}
          step={1000}
        />
      </div>
    </form>
  );
};
