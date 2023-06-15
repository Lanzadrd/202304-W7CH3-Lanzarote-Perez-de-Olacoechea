import { Router as createRouter } from 'express';
import { BookController } from '../controllers/book.controller.js';
import { BooksRepo } from '../repository/book.mongo.repository.js';
import createDebug from 'debug';
import { AuthInterceptor } from '../middleware/auth.interceptor.js';

const debug = createDebug('W6:BookRouter');
const repo: BooksRepo = new BooksRepo();
const auth = new AuthInterceptor();
const controller = new BookController(repo);
export const bookRouter = createRouter();

debug('execued');
bookRouter.get('/', auth.logged.bind(auth), controller.getAll.bind(controller));
bookRouter.get('/:id', controller.getById.bind(controller));
bookRouter.post('/', auth.logged.bind(auth), controller.post.bind(controller));
bookRouter.patch(
  '/:id',
  auth.logged.bind(auth),
  controller.patch.bind(controller)
);
bookRouter.delete(
  '/:id',
  auth.logged.bind(auth),
  controller.delete.bind(controller)
);
