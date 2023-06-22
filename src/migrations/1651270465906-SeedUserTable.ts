import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { User } from '../entities/user/user.entity';
import { userSeed } from '../seeds/user.seed';

export class SeedUserTable1651270465906 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await getRepository(User).save(userSeed);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
