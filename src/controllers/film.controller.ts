import { FilmsRepo } from '../repository/film.mongo.repository.js';
import createDebug from 'debug';
import { Controller } from './controller.js';
import { Film } from '../entities/film.js';
import { NextFunction, Request, Response } from 'express';
import { PayloadToken } from '../services/auth.js';
import { UserRepo } from '../repository/user.mongo.repository.js';
const debug = createDebug('---> W6:BookControler <---');

export class FilmController extends Controller<Film> {
  // eslint-disable-next-line no-unused-vars
  constructor(protected repo: FilmsRepo, private userRepo: UserRepo) {
    super();
    debug('Instantiated');
  }

  async post(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.body.tokenPayload as PayloadToken;
      await this.userRepo.queryById(id);
      delete req.body.tokenPayload;
      req.body.owner = id;

      res.status(201);
      res.send(await this.repo.create(req.body));
    } catch (error) {
      next(error);
    }
  }
}
