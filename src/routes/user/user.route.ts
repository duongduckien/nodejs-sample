import express from 'express';
const schemaValidator = require('express-joi-validator');

// Controller
import userController from '../../controllers/user/user.controller';

// Schema
import userSchema from '../../validations/schemas/user.schema';

// Middleware
import { isAdmin } from '../../middlewares/permission-handler.middleware';

const router = express.Router();

router.get(
  '/',
  userController.list,
);

router.delete(
  '/:id',
  isAdmin(),
  userController.remove,
);

export default router;
