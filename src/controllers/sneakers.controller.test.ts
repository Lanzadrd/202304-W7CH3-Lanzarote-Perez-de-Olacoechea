import { Request, Response } from 'express';
import { SneakersController } from './sneakers.controller';

jest.mock('fs/promises');

describe('Given sneaker controller', () => {
  describe('When its instanciated', () => {
    const mockRepo = {
      getAll: jest.fn(),
      getById: jest.fn(),
      search: jest.fn(),
      query: jest.fn(),
      delete: jest.fn(),
      post: jest.fn(),
      patch: jest.fn(),
      readById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    };
    const req = {} as Request;
    const res = {
      send: jest.fn(),
    } as unknown as Response;
    const next = jest.fn;
    const controller = new SneakersController(mockRepo);

    test('Then method query should...', async () => {
      controller.getAll(req, res, next);
      expect(res.send).toHaveBeenCalled();
      expect(mockRepo.query).toHaveBeenCalled();
    });
  });
});
