import { Schema, model } from 'mongoose';
import { Book } from '../entities/book.js';

const bookSchema = new Schema<Book>({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: String,
    required: true,
  },
});

bookSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject._id;
    delete returnedObject.PW;
  },
});

export const BookModel = model('Book', bookSchema, 'Books');
