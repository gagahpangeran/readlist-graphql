import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDateColumnForUserTable1632467827358
  implements MigrationInterface
{
  name = "AddDateColumnForUserTable1632467827358";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE `user` ADD `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)"
    );
    await queryRunner.query(
      "ALTER TABLE `user` ADD `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)"
    );
    await queryRunner.query(
      "ALTER TABLE `user` ADD `deletedAt` datetime(6) NULL"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("ALTER TABLE `user` DROP COLUMN `deletedAt`");
    await queryRunner.query("ALTER TABLE `user` DROP COLUMN `updatedAt`");
    await queryRunner.query("ALTER TABLE `user` DROP COLUMN `createdAt`");
  }
}
