import { NextFunction, Request, Response } from 'express';
import { SneakersRepo } from '../repository/sneaker.repository.js';
import createDebug from 'debug';
const debug = createDebug('W6:AstrySolutions-->');

export class SneakersController {
  // eslint-disable-next-line no-unused-vars
  constructor(private repo = new SneakersRepo()) {
    debug('Instantiated SneakersController');
    debug(this.repo);
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      res.send(await this.repo.query());
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response) {
    res.send(await this.repo.readById(req.params.id));
  }

  async post(req: Request, res: Response) {
    await this.repo.create(req.body);
    res.send(`Succesfully added new element to database: "${req.body.name}"`);
  }

  async patch(req: Request, res: Response, next: NextFunction) {
    try {
      await this.repo.update(req.body, req.params.id);
      res.status(202);
      res.send('Patched element!');
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await this.repo.delete(req.params.id);
      res.status(204);
      res.send(`Deleted element nº ${req.params.id}`);
    } catch (error) {
      next(error);
    }
  }
}
