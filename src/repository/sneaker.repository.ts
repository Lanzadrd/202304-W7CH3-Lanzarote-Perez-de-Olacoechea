import fs from 'fs/promises';
import { Sneaker } from '../entities/sneaker';
import { Repo } from './repo.js';
import createDebug from 'debug';

const debug = createDebug('W6:SampleRepo');
const file = './data.json';

const createID = (): Sneaker['id'] =>
  Math.trunc(Math.random() * 1_000_000).toString();

export class SneakersRepo implements Omit<Repo<Sneaker>, 'search'> {
  constructor() {
    debug('Sneakers Repo');
  }

  async query() {
    const stringData = await fs.readFile(file, { encoding: 'utf-8' });
    const aData = JSON.parse(stringData) as Sneaker[];
    return aData;
  }

  async queryById(id: string) {
    const allData = await this.query();
    const requestedItem = allData.find((item) => item.id === id);
    if (!requestedItem) throw new Error('Bad ID for the query');
    return requestedItem;
  }

  async create(data: Omit<Sneaker, 'id'>) {
    const allData = await this.query(); // Tiene que ser string / buffer / typedArray
    const newSneaker: Sneaker = { ...data, id: createID() };
    const result = JSON.stringify([...allData, newSneaker]);
    await fs.writeFile(file, result, { encoding: 'utf8' });
    return newSneaker;
  }

  async update(id: string, data: Partial<Sneaker>) {
    const alldata = await this.query();
    let newSneaker: Sneaker = {} as Sneaker;
    const updatedData = alldata.map((item) => {
      if (item.id === id) {
        newSneaker = { ...item, ...data };
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
