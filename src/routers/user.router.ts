import { Router as createRouter } from 'express';
import { UserRepo } from '../repository/user.mongo.repository.js';
import createDebug from 'debug';
import { UserController } from '../controllers/user.controller.js';
import { Repo } from '../repository/repo.js';
import { User } from '../entities/user.js';

const debug = createDebug('W6:---userRouter---');

const repo: Repo<User> = new UserRepo() as unknown as Repo<User>;
const controller = new UserController(repo);
export const userRouter = createRouter();

debug('executed');
userRouter.post('/register', controller.register.bind(controller));
userRouter.patch('/login', controller.login.bind(controller));
