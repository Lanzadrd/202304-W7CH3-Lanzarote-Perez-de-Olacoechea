import { SneakersRepo } from '../repository/sneaker.repository.js';
import createDebug from 'debug';
import { Controller } from './controller.js';
import { Sneaker } from '../entities/sneaker.js';
const debug = createDebug('---> W6:SneakerController <---');

export class SneakersController extends Controller<Sneaker> {
  // eslint-disable-next-line no-unused-vars
  constructor(public repo = new SneakersRepo()) {
    super();
    debug('Instantiated');
    debug(this.repo);
  }
}
