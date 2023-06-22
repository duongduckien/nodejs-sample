import request, { CallbackHandler } from 'supertest';
import routes from './default.route';
import app from '../../configs/express.config';

describe('Testing default router', () => {
  test('Get default', (done: CallbackHandler) => {
    return request(app.use(routes))
      .get('/')
      .expect(200)
      .expect((res: any) => {
        const result = JSON.parse(res.text);
        expect(result).toHaveProperty('message');
      })
      .end(done);
  });
});
