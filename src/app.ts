import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import createDebug from 'debug';
import { sneakersRouter } from './routers/sneaker.router.js';
import { filmRouter } from './routers/film.router.js';
import { userRouter } from './routers/user.router.js';
const debug = createDebug('W6:App');

export const app = express();
debug('Loaded Express App');

const corsOptions = {
  origin: '*',
};

app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(express.json());

app.use((_req, _res, next) => {
  debug('Soy un middleware');
  next();
});

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello Express!');
});

app.use('/sneakers', sneakersRouter);
app.use('/books', filmRouter);
app.use('/user', userRouter);

app.use((error: Error, _req: Request, _res: Response, _next: NextFunction) => {
  console.log('Error Middleware');
  console.error(error);
  _res.send({
    error: error.message,
  });
});
