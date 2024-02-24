
import { setFilters } from '../../../../logic/reducer' // Assuming you have an action creator
// Import necessary dependencies
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slider';
const RangeSlider = ({ min, max, onRangeChange }) => {
    const rangeValues = [min,max];
  
    return (
      <div>
        <label>
          Lower Bound:
          <span>{rangeValues[0]}</span>
        </label>
        <Slider
          min={min}
          max={max}
          step={1}
          value={rangeValues}
         
        />
        <label>
          Upper Bound:
          <span>{rangeValues[1]}</span>
        </label>
      </div>
    );
  };
  
// FormComponent.jsx
export const FormComponent = () => {
  // Retrieve form data from Redux state
  // Redux dispatch function
  const dispatch = useDispatch();


    // Optionally, you can reset the form data in the Redux store
    // dispatch(resetFormData()); // Assuming you have a reset action creator


  return (
    <form>
      <label>
        Form Data:
        <input
          type="text"
          
          onChange={(e) => dispatch(setFilters({name:e.target.value}))}
        />

      <RangeSlider min={0} max={100} onRangeChange={null} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};



