import request, { CallbackHandler } from 'supertest';
import routes from './me.route';
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

describe('Testing me router', () => {
  test('Get current user', (done: CallbackHandler) => {
    return request(app.use(routes))
      .get('/me')
      .set('Cookie', `${constants.COOKIE.COOKIE_USER}=${token};`)
      .expect(200)
      .expect((res: any) => {
        const result = JSON.parse(res.text);
        expect(result).toHaveProperty('data');
        expect(result).toHaveProperty('success', true);
        expect(result.data.id).toBe(1);
        expect(result.data).toHaveProperty('email');
        expect(result.data).toHaveProperty('firstName');
        expect(result.data).toHaveProperty('lastName');
        expect(result.data).toHaveProperty('createdAt');
        expect(result.data).toHaveProperty('updatedAt');
      })
      .end(done);
  });

  test('Update current user', (done: CallbackHandler) => {
    return request(app.use(routes))
      .put('/me')
      .set('Cookie', `${constants.COOKIE.COOKIE_USER}=${token};`)
      .send({
        firstName: 'First',
        lastName: 'Last',
      })
      .expect(200)
      .expect((res: any) => {
        const result = JSON.parse(res.text);
        expect(result).toHaveProperty('data');
        expect(result).toHaveProperty('success', true);
        expect(result.data.firstName).toBe('First');
        expect(result.data.lastName).toBe('Last');
      })
      .end(done);
  });
});
