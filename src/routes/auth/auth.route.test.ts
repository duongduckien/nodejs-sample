import request, { CallbackHandler } from 'supertest';
import routes from './auth.route';
import app from '../../configs/express.config';
import SQLite from '../../configs/sqlite.config';

beforeAll(async () => {
  await SQLite.instance.setup();
});

afterAll(() => {
  SQLite.instance.destroy();
});

describe('Testing auth router', () => {
  test('Register a new user', (done: CallbackHandler) => {
    const user = {
      email: 'admin@gmail.com',
      password: 'password',
      firstName: 'First',
      lastName: 'Last',
    };
    return request(app.use(routes))
      .post('/auth/register')
      .send(user)
      .expect(201)
      .expect((res: any) => {
        const result = JSON.parse(res.text);
        expect(result).toHaveProperty('data');
        expect(result).toHaveProperty('success', true);
        expect(result.data.id).toBe(1);
        expect(result.data.email).toBe(user.email);
        expect(result.data.firstName).toBe(user.firstName);
        expect(result.data.lastName).toBe(user.lastName);
        expect(result.data).toHaveProperty('createdAt');
        expect(result.data).toHaveProperty('updatedAt');
      })
      .end(done);
  });

  test('User login', (done: CallbackHandler) => {
    const user = {
      email: 'admin@gmail.com',
      password: 'password',
    };
    return request(app.use(routes))
      .post('/auth/login')
      .send(user)
      .expect(200)
      .expect((res: any) => {
        const result = JSON.parse(res.text);
        expect(result).toHaveProperty('data');
        expect(result).toHaveProperty('success', true);
        expect(result.data.id).toBe(1);
        expect(result.data.email).toBe(user.email);
        expect(result.data).toHaveProperty('firstName');
        expect(result.data).toHaveProperty('lastName');
        expect(result.data).toHaveProperty('createdAt');
        expect(result.data).toHaveProperty('updatedAt');
      })
      .end(done);
  });
});
