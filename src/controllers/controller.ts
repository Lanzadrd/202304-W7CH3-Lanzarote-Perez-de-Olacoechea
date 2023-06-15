/* eslint-disable no-useless-constructor */
import { NextFunction, Request, Response } from 'express';
import { Repo } from '../repository/repo.js';

export abstract class Controller<T extends { id: string | number }> {
  protected repo!: Repo<T>;

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200);
      res.send(await this.repo.query());
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200);
      res.send(await this.repo.readById(req.params.id));
    } catch (error) {
      next(error);
    }
  }

  async post(req: Request, res: Response, next: NextFunction) {
    try {
      await this.repo.create(req.body);
      res.status(201);
      res.send(`Succesfully added new element to database!`);
    } catch (error) {
      next(error);
    }
  }

  async patch(req: Request, res: Response, next: NextFunction) {
    try {
      await this.repo.update(req.body, req.params.id);
      res.status(202);
      res.send('Succesfully patched element!');
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await this.repo.delete(req.params.id);
      res.status(204);
      res.send('Succesfully deleted element!');
    } catch (error) {
      next(error);
    }
  }
}
