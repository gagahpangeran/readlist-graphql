import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeReadListIdType1632465353888 implements MigrationInterface {
  name = "ChangeReadListIdType1632465353888";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "UPDATE `read_list` SET `id` = @i := @i + 1 ORDER BY `createdAt`, @i := 0"
    );

    await queryRunner.query(
      "ALTER TABLE `read_list` MODIFY COLUMN `id` int NOT NULL AUTO_INCREMENT"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE `read_list` MODIFY COLUMN `id` varchar(36) not null"
    );
  }
}
