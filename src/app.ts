import express from 'express';
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

app.use((_req: Request, _res: Request, next: () => void) => {
  debug('Soy un middleware');
  next();
});

app.get('/', (req: Request, res) => {
  res.send('Hello Express!');
});

app.use('/sneakers', sneakersRouter);
app.use('/:id', sneakersRouter);
app.use('/sneakers', sneakersRouter);
