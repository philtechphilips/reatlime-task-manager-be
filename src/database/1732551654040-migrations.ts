import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1732551654040 implements MigrationInterface {
  name = 'Migrations1732551654040';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`fullName\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`role\` varchar(255) NOT NULL DEFAULT 'user', \`isVerified\` tinyint NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`organizations\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`userId\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`members\` (\`id\` varchar(36) NOT NULL, \`organizationId\` varchar(36) NOT NULL, \`userId\` varchar(36) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`organizations\` ADD CONSTRAINT \`FK_d2656076ffa800cd40418456b71\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`members\` ADD CONSTRAINT \`FK_1784a83dc5192e284e5e16f208b\` FOREIGN KEY (\`organizationId\`) REFERENCES \`organizations\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`members\` ADD CONSTRAINT \`FK_839756572a2c38eb5a3b563126e\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`members\` DROP FOREIGN KEY \`FK_839756572a2c38eb5a3b563126e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`members\` DROP FOREIGN KEY \`FK_1784a83dc5192e284e5e16f208b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`organizations\` DROP FOREIGN KEY \`FK_d2656076ffa800cd40418456b71\``,
    );
    await queryRunner.query(`DROP TABLE \`members\``);
    await queryRunner.query(`DROP TABLE \`organizations\``);
    await queryRunner.query(`DROP TABLE \`users\``);
  }
}
