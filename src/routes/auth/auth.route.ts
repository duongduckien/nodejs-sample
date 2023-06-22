import express from 'express';
const schemaValidator = require('express-joi-validator');

// Controller
import userController from '../../controllers/user/user.controller';

// Schema
import userSchema from '../../validations/schemas/user.schema';

const router = express.Router();

router.post(
  '/register',
  schemaValidator(userSchema.register),
  userController.create,
);

router.post(
  '/login',
  schemaValidator(userSchema.login),
  userController.login,
);

export default router;
