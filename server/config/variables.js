import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT,
  weatherApiKey: process.env.WEATHER_API_KEY,
  locationApiKey: process.env.LOCATION_API_KEY,
  hereAccessKeyId: process.env.HERE_ACCESS_KEY_ID,
  hereAccessKeySecret: process.env.HERE_ACCESS_KEY_SECRET,
  hereTokenEndpoint: process.env.HERE_TOKEN_ENDPOINT,
};
