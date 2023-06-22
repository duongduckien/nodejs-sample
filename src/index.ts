require('dotenv').config();

import 'reflect-metadata';
import { createConnection } from 'typeorm';
import logger from './configs/logger.config';
import app from './configs/express.config';

const PORT = process.env.PORT || 5000;

const connect = async () => {
  try {
    const connection = await createConnection(); // Connect to the DB that is setup in the ormconfig.js
    await connection.runMigrations(); // Run all migrations
    logger.info('Connect to database successfully');
    app.listen(PORT, () => {
      logger.info(`Server running at ${PORT}`);
    });
  } catch (e) {
    logger.info(`The connection to database was failed with error: ${e}`);
  }
}

connect();
