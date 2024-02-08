import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { weatherSelector } from '../../../../logic/selectors';

export const Chart = () => {

    const weatherList = useSelector(weatherSelector);
    console.log("WeatherList", weatherList);


    return (
        <div style={{display:'flex', justifyContent:"space-between"}}>
        {weatherList.map((city) => {
            return (
                <div>
                    <h2>{city.name}</h2>
                    <p>Temperature: {city.temp_c}</p>
                    <p>Precipitation: {city.precip_mm}</p>
                </div>
            );
        })}

        </div>
    );

    }
