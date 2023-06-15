import { BooksRepo } from '../repository/book.mongo.repository.js';
import createDebug from 'debug';
import { Controller } from './controller.js';
import { Book } from '../entities/book.js';
const debug = createDebug('---> W6:BookControler <---');

export class BookController extends Controller<Book> {
  // eslint-disable-next-line no-unused-vars
  constructor(protected repo = new BooksRepo()) {
    super();
    debug('Instantiated');
    debug(this.repo);
  }
}
