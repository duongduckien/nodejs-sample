import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserTable1651270421471 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'createdAt',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'email',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'firstName',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'lastName',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'isDeleted',
            type: 'tinyint',
            default: '0',
          },
        ],
        uniques: [
          {
            columnNames: ['email'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
  }

}
