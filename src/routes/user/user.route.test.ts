import request, { CallbackHandler } from 'supertest';
import routes from './user.route';
import app from '../../configs/express.config';
import SQLite from '../../configs/sqlite.config';
import userService from '../../services/user/user.service';
import Encryption from '../../utilities/encryption.utility';
import constants from '../../constants';

let token: string;

beforeAll(async () => {
  await SQLite.instance.setup();

  const user = {
    email: 'admin@gmail.com',
    password: 'password',
    firstName: 'First',
    lastName: 'Last',
  };
  await userService.create(user);

  token = await Encryption.generateCookie(constants.COOKIE.KEY_USER_ID, '1');
});

afterAll(() => {
  SQLite.instance.destroy();
});

describe('Testing user router', () => {
  test('Get list users', (done: CallbackHandler) => {
    return request(app.use(routes))
      .get('/user')
      .set('Cookie', `${constants.COOKIE.COOKIE_USER}=${token};`)
      .expect(200)
      .expect((res: any) => {
        const result = JSON.parse(res.text);
        expect(result).toHaveProperty('data');
        expect(result).toHaveProperty('success', true);
        expect(result).toHaveProperty('pagination');
        expect(result.data.length).toBe(1);
      })
      .end(done);
  });

  test('Remove a user', (done: CallbackHandler) => {
    return request(app.use(routes))
      .delete('/user/1')
      .set('Cookie', `${constants.COOKIE.COOKIE_USER}=${token};`)
      .expect(200)
      .expect((res: any) => {
        const result = JSON.parse(res.text);
        expect(result).toHaveProperty('data');
        expect(result).toHaveProperty('success', true);
        expect(result.data.id).toBe(1);
      })
      .end(done);
  });
});
