import { Router as createRouter } from 'express';
import { SneakersController } from '../controllers/sneakers.controller.js';
import { SneakersRepo } from '../repository/sneaker.repository.js';
import createDebug from 'debug';
import { Sneaker } from '../entities/sneaker.js';
import { Repo } from '../repository/repo.js';

const debug = createDebug('W6:SneakerRouter');
const repo: Repo<Sneaker> = new SneakersRepo() as unknown as Repo<Sneaker>;
const controller = new SneakersController(repo);
export const sneakersRouter = createRouter();
debug('executed');

sneakersRouter.get('/', controller.getAll.bind(controller));
sneakersRouter.get('/:id', controller.getById.bind(controller));
sneakersRouter.post('/', controller.post.bind(controller));
sneakersRouter.patch('/:id', controller.patch.bind(controller));
sneakersRouter.delete('/:id', controller.delete.bind(controller));
