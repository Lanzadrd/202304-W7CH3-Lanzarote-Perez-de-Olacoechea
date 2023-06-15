import mongoose from 'mongoose';
// Import { user, PW, name } from '../config.js';

const user = 'Lanzadrd';
const PW = 'alfombradeverano1';
const name = 'Curso_2023_04';

export const dbConnect = () => {
  const uri = `mongodb+srv://${user}:${PW}@cluster0.slzair6.mongodb.net/${name}?retryWrites=true&w=majority`;
  return mongoose.connect(uri);
};
