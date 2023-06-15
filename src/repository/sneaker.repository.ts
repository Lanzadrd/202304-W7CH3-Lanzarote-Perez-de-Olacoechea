import fs from 'fs/promises';
import { Sneaker } from '../entities/sneaker';
import { Repo } from './repo.js';
import createDebug from 'debug';
const debug = createDebug('W6:SampleRepo');

const file = './data.json';

export class SneakersRepo implements Repo<Sneaker> {
  getAll: any;
  getById: any;
  search: any;
  post: any;
  patch: any;
  constructor() {
    debug('Sneakers Repo');
  }

  async query() {
    const stringData = await fs.readFile(file, { encoding: 'utf-8' });
    const aData = JSON.parse(stringData) as Sneaker[];
    return aData;
  }

  async readById(id: string) {
    const allData = await this.query();
    const requestedItem = allData.find((item: Sneaker) => item.id === id);
    if (!allData) throw new Error('Bad ID for the query');
    return requestedItem;
  }

  async create(body: Sneaker) {
    let allData = await this.query(); // Tiene que ser string / buffer / typedArray
    allData = [...allData, body];
    const updatedData = JSON.stringify(allData, null, 2);
    await fs.writeFile(file, updatedData, { encoding: 'utf-8' });
  }

  async update(body: Sneaker, id: string) {
    const data = this.query() as unknown as Sneaker[];
    const newSneaker: Sneaker = {} as Sneaker;
    const updatedData = data.map((item: Sneaker) => {
      if (item.id === id) {
        const newSneaker = { ...item, ...body };
        return newSneaker;
      }

      return item;
    });

    if ('id'! in newSneaker) throw new Error('Bad ID for the update');
    await fs.writeFile(file, JSON.stringify(updatedData), null);
    return newSneaker;
  }

  async delete(id: string) {
    const data = this.query() as unknown as Sneaker[];
    const updatedData = data.filter((item: Sneaker) => id !== item.id);
    if (updatedData.length === data.length)
      throw new Error('Bad ID for the delete');
    await fs.writeFile(file, JSON.stringify(updatedData), null);
  }
}
