import createDebug from 'debug';
import { Controller } from './controller.js';
import { Sneaker } from '../entities/sneaker.js';
import { Repo } from '../repository/repo.js';
const debug = createDebug('---> W6:SneakerController <---');

export class SneakersController extends Controller<Sneaker> {
  // eslint-disable-next-line no-unused-vars
  constructor(protected repo: Repo<Sneaker>) {
    super();
    debug('Instantiated');
  }
}
