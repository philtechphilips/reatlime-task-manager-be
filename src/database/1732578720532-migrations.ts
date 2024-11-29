import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1732578720532 implements MigrationInterface {
  name = 'Migrations1732578720532';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`comments\` (\`id\` varchar(36) NOT NULL, \`content\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` varchar(36) NULL, \`taskId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`tasks\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`details\` varchar(255) NOT NULL, \`dueDate\` date NOT NULL, \`status\` varchar(255) NOT NULL, \`priority\` varchar(255) NOT NULL, \`attachments\` json NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`assigneeId\` varchar(36) NULL, \`userId\` varchar(36) NULL, \`organizationId\` varchar(36) NULL, \`projectId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`members\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`members\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`organizations\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`organizations\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`projects\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`projects\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`projects\` DROP FOREIGN KEY \`FK_361a53ae58ef7034adc3c06f09f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`projects\` DROP FOREIGN KEY \`FK_eec93fd979bdcf5a0141da324d6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`projects\` CHANGE \`userId\` \`userId\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`projects\` CHANGE \`organizationId\` \`organizationId\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`projects\` ADD CONSTRAINT \`FK_361a53ae58ef7034adc3c06f09f\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`projects\` ADD CONSTRAINT \`FK_eec93fd979bdcf5a0141da324d6\` FOREIGN KEY (\`organizationId\`) REFERENCES \`organizations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_7e8d7c49f218ebb14314fdb3749\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_9adf2d3106c6dc87d6262ccadfe\` FOREIGN KEY (\`taskId\`) REFERENCES \`tasks\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tasks\` ADD CONSTRAINT \`FK_9a16d2c86252529f622fa53f1e3\` FOREIGN KEY (\`assigneeId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tasks\` ADD CONSTRAINT \`FK_166bd96559cb38595d392f75a35\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tasks\` ADD CONSTRAINT \`FK_a9a5a9fada64fc56e2aaf2f9464\` FOREIGN KEY (\`organizationId\`) REFERENCES \`organizations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tasks\` ADD CONSTRAINT \`FK_e08fca67ca8966e6b9914bf2956\` FOREIGN KEY (\`projectId\`) REFERENCES \`projects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`tasks\` DROP FOREIGN KEY \`FK_e08fca67ca8966e6b9914bf2956\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tasks\` DROP FOREIGN KEY \`FK_a9a5a9fada64fc56e2aaf2f9464\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tasks\` DROP FOREIGN KEY \`FK_166bd96559cb38595d392f75a35\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tasks\` DROP FOREIGN KEY \`FK_9a16d2c86252529f622fa53f1e3\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_9adf2d3106c6dc87d6262ccadfe\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_7e8d7c49f218ebb14314fdb3749\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`projects\` DROP FOREIGN KEY \`FK_eec93fd979bdcf5a0141da324d6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`projects\` DROP FOREIGN KEY \`FK_361a53ae58ef7034adc3c06f09f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`projects\` CHANGE \`organizationId\` \`organizationId\` varchar(36) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`projects\` CHANGE \`userId\` \`userId\` varchar(36) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`projects\` ADD CONSTRAINT \`FK_eec93fd979bdcf5a0141da324d6\` FOREIGN KEY (\`organizationId\`) REFERENCES \`organizations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`projects\` ADD CONSTRAINT \`FK_361a53ae58ef7034adc3c06f09f\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`projects\` DROP COLUMN \`updated_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`projects\` DROP COLUMN \`created_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`organizations\` DROP COLUMN \`updated_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`organizations\` DROP COLUMN \`created_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`members\` DROP COLUMN \`updated_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`members\` DROP COLUMN \`created_at\``,
    );
    await queryRunner.query(`DROP TABLE \`tasks\``);
    await queryRunner.query(`DROP TABLE \`comments\``);
  }
}
