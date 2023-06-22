import bcrypt from 'bcrypt';

export const userSeed = [
  {
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('password', 10),
    firstName: 'Administrator',
    lastName: '',
  },
  {
    email: 'matteo@gmail.com',
    password: bcrypt.hashSync('password', 10),
    firstName: 'Matteo',
    lastName: 'Gleichner',
  },
  {
    email: 'titus@gmail.com',
    password: bcrypt.hashSync('password', 10),
    firstName: 'Titus',
    lastName: 'Marvin',
  },
  {
    email: 'diamond@gmail.com',
    password: bcrypt.hashSync('password', 10),
    firstName: 'Diamond',
    lastName: 'Beahan',
  },
  {
    email: 'ivy@gmail.com',
    password: bcrypt.hashSync('password', 10),
    firstName: 'Ivy',
    lastName: 'Homenick',
  },
  {
    email: 'diana@gmail.com',
    password: bcrypt.hashSync('password', 10),
    firstName: 'Dianna',
    lastName: 'McLaughlin',
  },
  {
    email: 'gwen@gmail.com',
    password: bcrypt.hashSync('password', 10),
    firstName: 'Gwen',
    lastName: 'McKenzie',
  },
  {
    email: 'emmalee@gmail.com',
    password: bcrypt.hashSync('password', 10),
    firstName: 'Emmalee',
    lastName: 'Braun',
  },
  {
    email: 'angeline@gmail.com',
    password: bcrypt.hashSync('password', 10),
    firstName: 'Angeline',
    lastName: 'Hyatt',
  },
  {
    email: 'josephine@gmail.com',
    password: bcrypt.hashSync('password', 10),
    firstName: 'Josephine',
    lastName: 'Mann',
  },
];
