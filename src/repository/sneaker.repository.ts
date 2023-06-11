import fs from 'fs/promises';
import createDebug from 'debug';
const debug = createDebug('W6:SampleRepo');

type sneaker = {
  id: string;
  name: string;
  sku: string;
  brand: string;
};

const file = './data.json';

export class SneakersRepo {
  getAll: any;
  getById: any;
  post: any;
  patch: any;
  deleteById: any;
  constructor() {
    debug('Sneakers Repo');
  }

  async readAll() {
    const stringData = await fs.readFile(file, { encoding: 'utf-8' });
    return JSON.parse(stringData) as sneaker[];
  }

  async readById(id: string) {
    const stringData = await fs.readFile(file, { encoding: 'utf-8' });
    const allData = JSON.parse(stringData);
    return allData.find((item: sneaker) => item.id === id);
  }

  async create(body: sneaker) {
    const data = await fs.readFile(file, { encoding: 'utf-8' });
    let infoToAdd = JSON.parse(data); // Tiene que ser string / buffer / typedArray
    infoToAdd = [...infoToAdd, body];
    const updatedData = JSON.stringify(infoToAdd, null, 2);
    await fs.writeFile(file, updatedData, { encoding: 'utf-8' });
  }

  async update(body: sneaker, id: string) {
    const stringData = await fs.readFile(file, { encoding: 'utf-8' });
    const data = JSON.parse(stringData);
    const updatedData = data.map((item: sneaker) =>
      item.id === id ? { ...data, ...body } : item
    );
    await fs.writeFile(file, updatedData, null);
  }
}
