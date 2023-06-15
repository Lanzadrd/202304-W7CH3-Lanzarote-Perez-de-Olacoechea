import createDebug from 'debug';
import { Book } from '../entities/book';
import { Repo } from './repo.js';
import { BookModel } from './book.mongo.model.js';
import { HttpError } from '../types/httperror.js';
const debug = createDebug('W6:SampleRepo');

export class BooksRepo implements Repo<Book> {
  constructor() {
    debug('Books Repo');
  }

  async query(): Promise<Book[]> {
    console.log('-------MongoDB-------');
    const allData = await BookModel.find().exec();
    return allData;
  }

  async readById(id: string): Promise<Book> {
    const result = await BookModel.findById(id).exec();
    console.log('-------MongoDB-(ID)------');
    if (result === null) throw new Error('Bad ID for the query');
    return result;
  }

  async create(body: Book) {
    const result = await BookModel.create(body);
    console.log('-------MongoDB--(create)-----');
    console.log(`creating new Object.....`);
    return result;
  }

  async update(body: Book, id: string) {
    const newBook = BookModel.findByIdAndUpdate(id, body, { new: true }).exec();
    console.log('-------MongoDB--(update)-----');
    if (newBook === null)
      throw new HttpError(404, 'Not found', 'Bad ID for the update');
    return newBook;
  }

  async delete(id: string): Promise<void> {
    const result = BookModel.findByIdAndDelete(id).exec();
    console.log('-------MongoDB--(delete)-----');
    console.log(`deleteing ID: ${id}`);
    if (result === null)
      throw new HttpError(404, 'Not found', 'Bad ID for the delete');
  }
}
