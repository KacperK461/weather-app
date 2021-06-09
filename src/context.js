import React, { useState, useEffect } from 'react';
import useFetch from './hooks/useFetch';

const API_ENDPOINT = 'https://api.openweathermap.org/data/2.5/onecall';
const API_KEY = process.env.REACT_APP_WEATHER_KEY;
const LOCATION_KEY = process.env.REACT_APP_LOCATION_KEY;

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

    const url = `${API_ENDPOINT}?lt=${callInfo?.lat}&lon=${callInfo?.lon}&units=${callInfo?.unit}&appid=${API_KEY}`;
    const data = await getData(url);

    if (!data) {
      setError && setError(true);
      setLoading && setLoading(false);
      return;
    }

    setForecast(data);
    setLoading && setLoading(false);
  };

  const fetchHistoricalWeather = async (time, index, setLoading, setError) => {
    setLoading && setLoading(true);
    setError && setError(false);
    if (!callInfo) return;

    const url = `${API_ENDPOINT}/timemachine?lat=${callInfo.lat}&lon=${callInfo.lon}&units=${callInfo.unit}&dt=${time}&appid=${API_KEY}`;
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
    const url = `https://geolocation-db.com/json/${LOCATION_KEY}`;
    const data = await getData(url);

    if (data) {
      setCallInfo({
        lat: data.latitude,
        lon: data.longitude,
        unit: 'metric',
      });
    } else {
      setCallInfo({
        lat: 40.73061,
        lon: -73.935242,
        unit: 'metric',
        default: true,
      });
    }
  };

  useEffect(() => {
    if (
      localStorage.getItem('info') &&
      !JSON.parse(localStorage.getItem('info')).default
    ) {
      const { lat, lon, unit } = JSON.parse(localStorage.getItem('info'));
      setCallInfo({ lat, lon, unit });
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
