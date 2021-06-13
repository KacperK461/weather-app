import express from 'express';
import morgan from 'morgan';
import apiRouter from './server/routes/apiRouter.js';
import handleErrors from './server/middleware/errors.js';

const app = express();

app.use(morgan('tiny'));
app.use('/api', apiRouter);

app.use(handleErrors.notFound);
app.use(handleErrors.catchErrors);

export default app;
