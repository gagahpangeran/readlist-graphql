import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

export default abstract class Base {
  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;
}
