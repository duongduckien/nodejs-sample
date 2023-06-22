import SQLite from '../../configs/sqlite.config';
import mockApi from '../../mocks/api.mock';
import userController from './user.controller';

let req: any;
let res: any;

beforeAll(async () => {
  await SQLite.instance.setup();
});

afterAll(() => {
  SQLite.instance.destroy();
});

describe('Testing user controller', () => {
  beforeEach(() => {
    req = mockApi.mockRequest();
    res = mockApi.mockResponse();
  });

  afterEach(() => {
    req = null;
    res = null;
  });

  test('Create user', async () => {
    req.body = {
      email: 'admin@gmail.com',
      password: 'password',
      firstName: 'First',
      lastName: 'Last',
    }
    await userController.create(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
  });

  test('Create duplicated user', async () => {
    req.body = {
      email: 'admin@gmail.com',
      password: 'password',
      firstName: 'First',
      lastName: 'Last',
    }
    await userController.create(req, res);
    expect(res.status).toHaveBeenCalledWith(409);
  });

  test('Create incorrect user', async () => {
    await userController.create(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('User login', async () => {
    req.body = {
      email: 'admin@gmail.com',
      password: 'password',
    }
    await userController.login(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('User login with wrong data', async () => {
    req.body = {
      email: 'fake@gmail.com',
      password: 'password',
    }
    await userController.login(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('User login with empty data', async () => {
    req.body = null;
    await userController.login(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('Get current user', async () => {
    req.user = {
      id: 1,
    }
    await userController.me(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('Get user detail', async () => {
    req.params = {
      id: 1,
    }
    await userController.detail(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('Get user detail with wrong id', async () => {
    req.params = {
      id: 100,
    }
    await userController.detail(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('Update user', async () => {
    req.body = {
      firstName: 'First',
      lastName: 'Last',
    }
    req.params = {
      id: 1,
    }
    await userController.update(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('Update user with wrong data', async () => {
    req.body = null;
    await userController.update(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('Update current user', async () => {
    req.body = {
      firstName: 'First',
      lastName: 'Last',
    }
    req.user = {
      id: 1,
    }
    await userController.updateMe(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('Update current user with wrong data', async () => {
    req.body = null;
    await userController.updateMe(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('Get list users', async () => {
    req.query = {
      limit: 5,
      page: 1,
    }
    await userController.list(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('Get list users with wrong query params', async () => {
    req.query = null;
    await userController.list(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('Remove a user', async () => {
    req.params = {
      id: 1,
    }
    await userController.remove(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('Remove a wrong user', async () => {
    req.params = null;
    await userController.remove(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });
});
