import SQLite from '../../configs/sqlite.config';
import userService from './user.service';

let user: any;

beforeAll(async () => {
  user = {
    email: 'admin@gmail.com',
    password: 'password',
    firstName: 'First',
    lastName: 'Last',
  }
  await SQLite.instance.setup();
});

afterAll(() => {
  SQLite.instance.destroy();
});

describe('Testing user service', () => {
  test('Create a new user', async () => {
    const result = await userService.create(user);
    expect(result.id).toBe(1);
    expect(result.email).toBe(user.email);
    expect(result).toHaveProperty('password', undefined);
    expect(result.firstName).toBe(user.firstName);
    expect(result.lastName).toBe(user.lastName);
    expect(result).toHaveProperty('createdAt');
    expect(result).toHaveProperty('updatedAt');
  });

  test('User login', async () => {
    const result = await userService.login({
      email: user.email,
      password: user.password,
    });
    expect(result.id).toBe(1);
    expect(result.email).toBe(user.email);
    expect(result).toHaveProperty('password', undefined);
    expect(result.firstName).toBe(user.firstName);
    expect(result.lastName).toBe(user.lastName);
    expect(result).toHaveProperty('createdAt');
    expect(result).toHaveProperty('updatedAt');
  });

  test('Login with incorrect user', async () => {
    try {
      await userService.login({
        email: 'fake@gmail.com',
        password: user.password,
      });
    } catch (e) {
      expect(e.message).toBe('Your email has not been registered');
    }
  });

  test('Login with incorrect password', async () => {
    try {
      await userService.login({
        email: user.email,
        password: 'fake',
      });
    } catch (e) {
      expect(e.message).toBe('Your password is not correct');
    }
  });

  test('Get user by id', async () => {
    const result = await userService.getById({ id: 1 });
    expect(result.id).toBe(1);
    expect(result.email).toBe(user.email);
    expect(result).toHaveProperty('password', undefined);
    expect(result.firstName).toBe(user.firstName);
    expect(result.lastName).toBe(user.lastName);
    expect(result).toHaveProperty('createdAt');
    expect(result).toHaveProperty('updatedAt');
  });

  test('Get user by incorrect id', async () => {
    const result = await userService.getById({ id: 100 });
    expect(result).toBe(null);
  });

  test('Get user detail', async () => {
    const result = await userService.detail({ id: 1 });
    expect(result.id).toBe(1);
    expect(result.email).toBe(user.email);
    expect(result).toHaveProperty('password', undefined);
    expect(result.firstName).toBe(user.firstName);
    expect(result.lastName).toBe(user.lastName);
    expect(result).toHaveProperty('createdAt');
    expect(result).toHaveProperty('updatedAt');
  });

  test('Get user detail by incorrect id', async () => {
    try {
      await userService.detail({ id: 100 });
    } catch (e) {
      expect(e.message).toBe('User is not existed');
    }
  });

  test('Update user', async () => {
    await userService.update({
      id: 1,
      firstName: 'First2',
      lastName: 'Last2',
    });
    const result = await userService.getById({ id: 1 });
    expect(result.firstName).toBe('First2');
    expect(result.lastName).toBe('Last2');
  });

  test('Update incorrect user', async () => {
    try {
      await userService.update({
        id: 100,
        firstName: 'First2',
        lastName: 'Last2',
      });
    } catch (e) {
      expect(e.message).toBe('User is not existed');
    }
  });

  test('Get list users', async () => {
    const result = await userService.list({
      page: 1,
      limit: 5,
    });
    expect(result).toHaveProperty('response');
    expect(result).toHaveProperty('pagination');
    expect(Array.isArray(result.response)).toBe(true);
    expect(result.response.length).toBe(1);
  });

  test('Get list users with keyword', async () => {
    const result = await userService.list({
      page: 1,
      limit: 5,
      keyword: 'F',
    });
    expect(result).toHaveProperty('response');
    expect(result).toHaveProperty('pagination');
    expect(Array.isArray(result.response)).toBe(true);
    expect(result.response.length).toBe(1);
  });

  test('Remove a user', async () => {
    const result = await userService.remove({ id: 1 });
    expect(result).toBeDefined();
  });

  test('Remove incorrect user', async () => {
    try {
      await userService.remove({ id: 100 });
    } catch (e) {
      expect(e.message).toBe('User is not existed');
    }
  });
});
