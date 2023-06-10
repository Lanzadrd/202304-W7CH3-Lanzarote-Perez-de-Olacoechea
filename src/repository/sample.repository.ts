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

  async create(req: Request) {
    const infoToAdd = JSON.stringify((req.body, null, 2)); // Tiene que ser string / buffer / typedArray
    const createInfo = await fs.appendFile(file, infoToAdd, {
      encoding: 'utf-8',
    });
    return createInfo;
  }
}
