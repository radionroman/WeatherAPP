import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { weatherSelector } from '../../../../logic/selectors';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
export { ChartWrapper } from './ChartWrapper';

export const Chart = () => {

    const weatherList = useSelector(weatherSelector);

    return (
        <div style={{ width: '100%', height: '85vh' }}>
        <ResponsiveContainer width="100%" height="85%" >
        <BarChart  data={weatherList} margin={{ top: 20, right: 30, left: 20, bottom: 130 }}>
        <Legend verticalAlign='top' height={30} />
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" angle={-90} textAnchor="end" interval={0} />
        <YAxis />
        <Tooltip />
        <Bar dataKey="temp_c" fill="#8884d8" />
            <Bar dataKey="pressure" name="pressure - 1000" fill="#82ca9d" />
        </BarChart>
        </ResponsiveContainer>
        </div>
    );

    }
