import { Router as createRouter } from 'express';
import { FilmController } from '../controllers/film.controller.js';
import { FilmsRepo } from '../repository/film.mongo.repository.js';
import createDebug from 'debug';
import { AuthInterceptor } from '../middleware/auth.interceptor.js';
import { UserRepo } from '../repository/user.mongo.repository.js';

const debug = createDebug('W6:BookRouter');
const repo = new FilmsRepo();
const auth = new AuthInterceptor();
const controller = new FilmController(repo, new UserRepo());
export const filmRouter = createRouter();

debug('execued');
filmRouter.get('/', auth.logged.bind(auth), controller.getAll.bind(controller));
filmRouter.get('/:id', controller.getById.bind(controller));
filmRouter.post('/', auth.logged.bind(auth), controller.post.bind(controller));
filmRouter.patch(
  '/:id',
  auth.logged.bind(auth),
  controller.patch.bind(controller)
);
filmRouter.delete(
  '/:id',
  auth.logged.bind(auth),
  controller.delete.bind(controller)
);
