import constants from '../constants';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

export default class Encryption {
  static async generateHash(password: string, saltRounds: number): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, (err: any, hash: string) => {
        if (!err) {
          resolve(hash);
        }
        reject(err);
      });
    });
  }

  static async verifyHash(password: string, hash: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hash, (err: any, result: string) => {
        if (result) {
          resolve(true);
        }
        resolve(false);
      });
    });
  }

  static async generateCookie(key: string, value: string) {
    const data: { [key: string]: string } = {};
    data[key] = value;
    return await jwt.sign({ data }, constants.APPLICATION.env.authSecret, {
      expiresIn: constants.APPLICATION.timers.userCookieExpiry,
    });
  };

  static async verifyCookie(token: string): Promise<any> {
    return new Promise((resolve) => {
      jwt.verify(
        token,
        constants.APPLICATION.env.authSecret,
        (err: Error, decoded: any) => {
          if (err) {
            resolve(null);
          } else {
            resolve(decoded);
          }
        },
      );
    });
  }
}
