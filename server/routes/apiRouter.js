import express from 'express';
const router = express.Router();

import apiController from '../controllers/apiController.js';
import { catchAsync } from '../middleware/errors.js';

router.get('/forecast', catchAsync(apiController.sendForecast));
router.get('/historical', catchAsync(apiController.sendHistoricalWeather));
router.get('/location', catchAsync(apiController.sendLocation));
router.get('/autocomplete', catchAsync(apiController.sendAutocomplete));

export default router;
