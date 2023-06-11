import { Request, Response } from 'express';
import { SneakersRepo } from '../repository/sneaker.repository.js';
import createDebug from 'debug';
const debug = createDebug('W6:AstrySolutions-->');

export class SneakersController {
  repo: SneakersRepo;
  static getAll: any;
  constructor() {
    this.repo = new SneakersRepo();
    debug('Instantiated SneakersController');
  }

  async getAll(req: Request, res: Response) {
    res.send(await this.repo.readAll());
  }

  async getById(req: Request, res: Response) {
    res.send(await this.repo.readById(req.params.id));
  }

  async post(req: Request, res: Response) {
    await this.repo.create(req.body);
    res.send('Succesfully added new element to database');
  }

  async patch(req: Request, res: Response) {
    await this.repo.update(req.body, req.params.id);
    res.send('Patched element!');
  }

  deleteById(req: Request, res: Response) {
    res.send('Delete Sample!: ' + req.body.user);
  }
}
