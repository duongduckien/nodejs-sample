import { Connection, createConnection } from 'typeorm';
import Database from 'better-sqlite3';

export default class SQLite {

  private static db: SQLite;

  public static get instance(): SQLite {
    if (!this.db) {
      this.db = new SQLite();
    }
    return this.db;
  }

  private dbConnection!: Connection;
  private sqliteDB!: any;

  async setup() {
    this.sqliteDB = new Database(':memory:', { verbose: console.log });
    this.dbConnection = await createConnection({
      name: 'default',
      type: 'better-sqlite3',
      database: ':memory:',
      entities: ['src/entities/**/*.ts'],
      synchronize: true,
    });
  }

  destroy() {
    this.dbConnection.close();
    this.sqliteDB.close();
  }

}
