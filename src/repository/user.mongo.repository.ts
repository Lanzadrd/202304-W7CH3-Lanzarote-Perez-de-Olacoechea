import createDebug from 'debug';
import { UserModel } from './user.mongo.model.js';
import { User } from '../entities/user.js';
import { Repo } from './repo.js';
import { HttpError } from '../types/httperror.js';

// Import { HttpError } from '../types/httperror.js';
const debug = createDebug('W6:UserRepo');

export class UserRepo implements Partial<Repo<User>> {
  constructor() {
    debug('Instantiated', UserModel);
  }

  async search({
    key,
    value,
  }: {
    key: string;
    value: unknown;
  }): Promise<User[]> {
    const result = await UserModel.find({ [key]: value }).exec();
    return result;
  }

  async queryById(id: string): Promise<User> {
    const result = await UserModel.findById(id).exec();
    if (result === null)
      throw new HttpError(404, 'Not found', 'Bad ID for the query');
    return result;
  }

  async create(data: Omit<User, 'id'>): Promise<User> {
    const result = await UserModel.create(data);
    console.log('-------MongoDB--(create)-----');
    console.log(`creating new Object.....`);
    return result;
  }
}
