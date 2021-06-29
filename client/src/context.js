import React, { useState, useEffect } from 'react';
import useFetch from './hooks/useFetch';

const DataContext = React.createContext();

const DataProvider = ({ children }) => {
  const [forecast, setForecast] = useState(null);
  const [historicalWeather, setHistoricalWeather] = useState({});
  const [callInfo, setCallInfo] = useState(null);
  const { getData } = useFetch();

  const fetchForecast = async (setLoading, setError) => {
    setLoading && setLoading(true);
    setError && setError(false);
    if (!callInfo) return;

    const url = `/api/forecast?lat=${callInfo?.lat}&lon=${callInfo?.lon}&units=${callInfo?.unit}`;
    const data = await getData(url);

    if (!data) {
      setError && setError(true);
      setLoading && setLoading(false);
      return;
    }

    setForecast(data);
    setLoading && setLoading(false);
    return data;
  };

  const fetchHistoricalWeather = async (time, index, setLoading, setError) => {
    setLoading && setLoading(true);
    setError && setError(false);
    if (!callInfo) return;

    const url = `/api/historical?lat=${callInfo.lat}&lon=${callInfo.lon}&units=${callInfo.unit}&dt=${time}`;
    const data = await getData(url);

    if (!data) {
      setError && setError(true);
      setLoading && setLoading(false);
      return;
    }

    setHistoricalWeather((prevState) => {
      return { ...prevState, [index]: data };
    });
    setLoading && setLoading(false);
  };

  const setDefaultInfo = async () => {
    const url = `api/location`;
    const data = await getData(url);

    if (data) {
      setCallInfo({
        lat: data.latitude,
        lon: data.longitude,
        unit: 'metric',
        address: data.country_name + (data.city ? `, ${data.city}` : ''),
      });
    } else {
      setCallInfo({
        lat: 40.73061,
        lon: -73.935242,
        unit: 'metric',
        default: true,
        address: 'USA, New York',
      });
    }
  };

  useEffect(() => {
    if (
      localStorage.getItem('info') &&
      !JSON.parse(localStorage.getItem('info')).default
    ) {
      const info = JSON.parse(localStorage.getItem('info'));
      setCallInfo(info);
    } else setDefaultInfo();
  }, []);

  useEffect(() => {
    localStorage.setItem('info', JSON.stringify(callInfo));
  }, [callInfo]);

  return (
    <DataContext.Provider
      value={{
        forecast,
        historicalWeather,
        fetchForecast,
        fetchHistoricalWeather,
        callInfo,
        setCallInfo,
      }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataProvider, DataContext };
