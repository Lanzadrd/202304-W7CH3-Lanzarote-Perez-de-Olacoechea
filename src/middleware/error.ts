import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../types/http.error.js';
import mongoose from 'mongoose';

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log('Error Middleware');

  if (error instanceof HttpError) {
    console.error(error.status, error.statusMessage, error.message);
    res.status(error.status);
    res.statusMessage = error.message;
    res.send({
      status: error.status + ' ' + error.statusMessage,
      error: error.message,
    });
    return;
  }

  console.error(error);
  res.status(500);
  res.send({
    error: error.message,
  });

  if (error instanceof mongoose.Error.ValidationError) {
    console.error('400 Bad Request', error.message);
    res.status(400);
    res.statusMessage = 'Bad request';
    res.send({
      status: error.status + ' ' + error.statusMessage,
      error: error.message,
    });
  }
};
