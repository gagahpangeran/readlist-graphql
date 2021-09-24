import { Column, Entity } from "typeorm";
import Base from "./Base";

@Entity()
export default class User extends Base {
  @Column()
  username!: string;

  @Column()
  password!: string;
}
