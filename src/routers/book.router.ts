import { Router as createRouter } from 'express';
import { BookController } from '../controllers/book.controller.js';
import { BooksRepo } from '../repository/book.mongo.repository.js';
import createDebug from 'debug';

const debug = createDebug('W6:BookRouter');
const repo: BooksRepo = new BooksRepo();
const controller = new BookController(repo);
export const bookRouter = createRouter();

debug('execued');
bookRouter.get('/', controller.getAll.bind(controller));
bookRouter.get('/:id', controller.getById.bind(controller));
bookRouter.post('/', controller.post.bind(controller));
bookRouter.patch('/:id', controller.patch.bind(controller));
bookRouter.delete('/:id', controller.delete.bind(controller));
