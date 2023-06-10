import { Router as createRouter } from 'express';
import { SneakersController } from '../controllers/sample.controller.js';

const controller = new SneakersController();
export const sneakersRouter = createRouter();

sneakersRouter.get('/', controller.getAll.bind(controller));
sneakersRouter.get('/:id', controller.getById.bind(controller));
sneakersRouter.post('/create', controller.post.bind(controller));
sneakersRouter.patch('/:id', controller.patch.bind(controller));
sneakersRouter.delete('/:id', controller.deleteById.bind(controller));
