import { Request, Response } from 'express';
import { SneakersRepo } from '../repository/sample.repository.js';
import createDebug from 'debug';
const debug = createDebug('W6:AstrySolutions-->');

export class SneakersController {
  repo: SneakersRepo;
  static getAll: any;
  constructor() {
    this.repo = new SneakersRepo();
    debug('Instantiated SneakersController');
    debug(this.repo);
  }

  async getAll(req: Request, res: Response) {
    res.send(await this.repo.readAll());
  }

  async getById(req: Request, res: Response) {
    res.send(await this.repo.readById(req.params.id));
  }

  async post(req: Request, res: Response) {
    await this.repo.create(req.body);
    res.send('Añadido nuevo elemento a la lista: ' + req.body);
  }

  patch(req: Request, res: Response) {
    res.send('Patch Sample!: ' + req.body.user);
  }

  deleteById(req: Request, res: Response) {
    res.send('Delete Sample!: ' + req.body.user);
  }
}
