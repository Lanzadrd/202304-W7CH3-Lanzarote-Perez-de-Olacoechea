import createDebug from 'debug';
import { UserModel } from './user.mongo.model.js';
import { User } from '../entities/user.js';
import { Repo } from './repo.js';

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

  async create(data: Omit<User, 'id'>): Promise<User> {
    const result = await UserModel.create(data);
    console.log('-------MongoDB--(create)-----');
    console.log(`creating new Object.....`);
    return result;
  }
}