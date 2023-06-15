import { hash, compare } from 'bcrypt';
import pkg from 'jsonwebtoken';
import { secret } from '../config.js';
import { HttpError } from '../types/httperror.js';

type PayloadToken = {
  id: string;
  username: string;
} & pkg.JwtPayload;

export class AuthServices {
  private static salt = 10;

  static createJWT(payload: PayloadToken) {
    const token = pkg.sign(payload, secret!);
    return token;
  }

  static verifyJWTGettingPayload(token: string) {
    const result = pkg.verify(token, secret!);
    if (typeof result === 'string') {
      throw new HttpError(498, 'Invalid Token', result);
    }

    return result;
  }

  static hash(value: string) {
    return hash(value, AuthServices.salt);
  }

  static compare(value: string, hash: string) {
    return compare(value, hash);
  }
}
