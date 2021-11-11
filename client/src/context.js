import React, { useState, useEffect } from 'react';
import useFetch from './hooks/useFetch';

const DataContext = React.createContext();

const DataProvider = ({ children }) => {
  const forecast = useFetch();
  const historicalWeather = [
    useFetch(),
    useFetch(),
    useFetch(),
    useFetch(),
    useFetch(),
  ];
  const location = useFetch();

  const [callProps, setCallProps] = useState({});

  const fetchForecast = async () => {
    if (!callProps) return;

    const url = `/api/forecast?lat=${callProps?.lat}&lon=${callProps?.lon}&units=${callProps?.unit}`;
    await forecast.getData(url);
  };

  const fetchHistoricalWeather = async (time, index) => {
    if (!callProps) return;

    const url = `/api/historical?lat=${callProps?.lat}&lon=${callProps?.lon}&units=${callProps?.unit}&dt=${time}`;
    await historicalWeather[index].getData(url);
  };

  const setDefaultCallProps = async () => {
    const url = `api/location`;
    await location.getData(url);

    if (location.data) {
      setCallProps({
        lat: location.data.latitude,
        lon: location.data.longitude,
        unit: 'metric',
        address:
          location.data.country_name +
          (location.data.city ? `, ${location.data.city}` : ''),
      });
    } else {
      setCallProps({
        lat: 40.73061,
        lon: -73.935242,
        unit: 'metric',
        default: true,
        address: 'USA, New York',
      });
    }
  };

  useEffect(() => {
    const props = JSON.parse(localStorage.getItem('callProps'));
    if (props && Object.keys(props).length && !props.default)
      setCallProps(props);
    else setDefaultCallProps();
  }, []);

  useEffect(
    () => localStorage.setItem('callProps', JSON.stringify(callProps)),
    [callProps]
  );

  return (
    <DataContext.Provider
      value={{
        forecast,
        historicalWeather,
        fetchForecast,
        fetchHistoricalWeather,
        callProps,
        setCallProps,
      }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataProvider, DataContext };
