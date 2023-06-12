import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import createDebug from 'debug';
import { sneakersRouter } from './routers/sample.router.js';
import bodyParser from 'body-parser';
const debug = createDebug('W6:App');

export const app = express();

debug('Loaded Express App');

const corsOptions = {
  origin: '*',
};

app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/*+json' }));

app.use((_req, _res, next) => {
  debug('Soy un middleware');
  next();
});

app.get('/', (req, res) => {
  res.send('Hello Express!');
});

app.use('/sneakers', sneakersRouter);
app.use('/:id', sneakersRouter);
app.use('/sneakers', sneakersRouter);
app.use((error: Error, _req: Request, _res: Response, _next: NextFunction) => {
  console.log('Error Middleware');
  console.error(error);
  _res.send({
    error: error.message,
  });
});
