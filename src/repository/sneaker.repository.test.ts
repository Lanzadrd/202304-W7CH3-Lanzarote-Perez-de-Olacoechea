import { SneakersRepo } from './sneaker.repository';
import fs from 'fs/promises';

jest.mock('fs/promises');

describe('Given sample repo class', () => {
  describe('When is instanciated', () => {
    const repo = new SneakersRepo();
    test('Then method query should...', async () => {
      (fs.readFile as jest.Mock).mockResolvedValueOnce(`{}`);
      await repo.query();
      expect(fs.readFile).toHaveBeenCalled();
    });
    test('Then method query should...', async () => {
      const mockSample = [{ id: '1' }];
      (fs.readFile as jest.Mock).mockResolvedValueOnce(
        JSON.stringify(mockSample)
      );
      const result = await repo.readById('1');
      expect(fs.readFile).toHaveBeenCalled();
      expect(result).toEqual(mockSample);
    });
  });
});
