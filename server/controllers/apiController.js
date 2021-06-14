import axios from 'axios';
import getToken from '../services/hereToken.js';
import env from '../config/variables.js';

const WEATHER_API_ENDPOINT = 'https://api.openweathermap.org/data/2.5/onecall';
const LOCATION_API_ENDPOINT = 'https://geolocation-db.com/json/';
const AUTOCOMPLETE_API_ENDPOINT =
  'https://autocomplete.search.hereapi.com/v1/autocomplete';
const GEOCODE_API_ENDPOINT = 'https://geocode.search.hereapi.com/v1/geocode';

const sendForecast = async (req, res, next) => {
  const { lat, lon, units } = req.query;
  const response = await axios(
    `${WEATHER_API_ENDPOINT}?lat=${lat}&lon=${lon}&units=${units}&appid=${env.weatherApiKey}`
  );

  res.json(response.data);
};

const sendHistoricalWeather = async (req, res, next) => {
  const { lat, lon, units, dt } = req.query;
  const response = await axios(
    `${WEATHER_API_ENDPOINT}/timemachine?lat=${lat}&lon=${lon}&units=${units}&dt=${dt}&appid=${env.weatherApiKey}`
  );

  res.json(response.data);
};

const sendLocation = async (req, res, next) => {
  const response = await axios(
    `${LOCATION_API_ENDPOINT}/${env.locationApiKey}`
  );

  res.json(response.data);
};

const sendAutocomplete = async (req, res, next) => {
  const token = await getToken();
  const response = await axios(
    `${AUTOCOMPLETE_API_ENDPOINT}?q='${encodeURIComponent(req.query.q)}'`,
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }
  );

  res.json(response.data);
};

const sendGeocode = async (req, res, next) => {
  const token = await getToken();
  const response = await axios(
    `${GEOCODE_API_ENDPOINT}?q='${encodeURIComponent(req.query.q)}'`,
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }
  );

  res.json(response.data);
};

export default {
  sendForecast,
  sendHistoricalWeather,
  sendLocation,
  sendAutocomplete,
  sendGeocode,
};
