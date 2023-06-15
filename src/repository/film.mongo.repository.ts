import createDebug from 'debug';
import { Film } from '../entities/film';
import { Repo } from './repo.js';
import { FilmModel } from './film.mongo.model.js';
import { HttpError } from '../types/httperror.js';
const debug = createDebug('W6:SampleRepo');

export class FilmsRepo implements Repo<Film> {
  constructor() {
    debug('Books Repo');
  }

  async query(): Promise<Film[]> {
    console.log('-------MongoDB-------');
    const allData = await FilmModel.find().exec();
    return allData;
  }

  async queryById(id: string): Promise<Film> {
    const result = await FilmModel.findById(id).exec();
    console.log('-------MongoDB-(ID)------');
    if (result === null) throw new Error('Bad ID for the query');
    return result;
  }

  async search({
    key,
    value,
  }: {
    key: string;
    value: unknown;
  }): Promise<Film[]> {
    const result = await FilmModel.find({ [key]: value }).exec();
    return result;
  }

  async create(data: Omit<Film, 'id'>): Promise<Film> {
    const result = await FilmModel.create(data);
    console.log('-------MongoDB--(create)-----');
    console.log(`creating new Object.....`);
    return result;
  }

  async update(id: string, data: Partial<Film>): Promise<Film> {
    const newFilm = await FilmModel.findByIdAndUpdate(id, data, {
      new: true,
    }).exec();
    console.log('-------MongoDB--(update)-----');
    if (newFilm === null)
      throw new HttpError(404, 'Not found', 'Bad ID for the update');
    return newFilm;
  }

  async delete(id: string): Promise<void> {
    const result = FilmModel.findByIdAndDelete(id).exec();
    console.log('-------MongoDB--(delete)-----');
    console.log(`deleteing ID: ${id}`);
    if (result === null)
      throw new HttpError(404, 'Not found', 'Bad ID for the delete');
  }
}
