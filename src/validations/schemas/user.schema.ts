import joi from 'joi';

export default {
  register: {
    body: {
      email: joi.string().email().required(),
      password: joi.string().min(6).max(30).required(),
      firstName: joi.string().min(3).max(100).required(),
      lastName: joi.string().min(3).max(100).required(),
    },
  },
  login: {
    body: {
      email: joi.string().email().required(),
      password: joi.string().required(),
    },
  },
  updateMe: {
    body: {
      firstName: joi.string().min(3).max(100).required(),
      lastName: joi.string().min(3).max(100).required(),
    },
  },
};
