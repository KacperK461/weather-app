import React, { useState } from 'react';
import useFetch from './hooks/useFetch';

const API_ENDPOINT = 'https://api.openweathermap.org/data/2.5/onecall';
const API_KEY = process.env.REACT_APP_WEATHER_KEY;

const DataContext = React.createContext();

const DataProvider = ({ children }) => {
  const [forecast, setForecast] = useState(null);
  const [historicalWeather, setHistoricalWeather] = useState({});
  const [loading, setLoading] = useState(true);
  const [unit, setUnit] = useState('metric');
  const { getData } = useFetch();

  const fetchForecast = async (lat, lon) => {
    setLoading(true);
    const url = `?${API_ENDPOINT}lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`;
    const data = await getData(url);

    setForecast(data);
    setLoading(false);
  };

  const fetchHistoricalWeather = async (lat, lon, time, index) => {
    setLoading(true);
    const url = `${API_ENDPOINT}/timemachine?lat=${lat}&lon=${lon}&units=${unit}&dt=${time}&appid=${API_KEY}`;
    const data = await getData(url);

    setHistoricalWeather((prevState) => {
      return { ...prevState, [index]: data };
    });
    setLoading(false);
  };

  return (
    <DataContext.Provider
      value={{
        forecast,
        historicalWeather,
        fetchForecast,
        loading,
        unit,
        setUnit,
        fetchHistoricalWeather,
      }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataProvider, DataContext };
