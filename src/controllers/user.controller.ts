import { NextFunction, Request, Response } from 'express';
import { UserRepo } from '../repository/user.mongo.repository.js';
import createDebug from 'debug';
import { AuthServices } from '../services/auth.js';
import { HttpError } from '../types/httperror.js';
const debug = createDebug('---> W6:UserController <---');

export class UserController {
  // eslint-disable-next-line no-unused-vars
  constructor(protected repo: UserRepo) {
    debug('Instantiated');
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const pw = await AuthServices.hash(req.body.password);

      req.body.password = pw;
      res.status(201);
      res.send(await this.repo.create(req.body));
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.body.user || !req.body.password) {
        throw new HttpError(
          400,
          'Bad request',
          "User and password don't match"
        );
      }

      let data = await this.repo.search({
        key: `userName`,
        value: req.body.user,
      });
      if (!data.length) {
        data = await this.repo.search({
          key: `email`,
          value: req.body.user,
        });
      }

      if (!data.length) {
        throw new HttpError(
          400,
          'Bad request',
          "User and password don't match"
        );
      }

      const isUserValid = await AuthServices.compare(
        req.body.password,
        data[0].password
      );
      if (!isUserValid) {
        throw new HttpError(
          400,
          'Bad request',
          "User and password don't match"
        );
      }

      console.log(
        `--------(.)---(.)----User ${req.body.user} logged in!--------------`
      );
      res.send(`Succesfully logged in!`);
    } catch (error) {
      next(error);
    }
  }
}
