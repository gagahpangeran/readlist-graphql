import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateReadListTable1616907307754 implements MigrationInterface {
  name = "CreateReadListTable1616907307754";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TABLE `read_list` (`id` varchar(36) NOT NULL, `link` varchar(255) NOT NULL, `title` varchar(255) NOT NULL, `readAt` datetime NULL, `comment` text NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deletedAt` datetime(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DROP TABLE `read_list`");
  }
}
