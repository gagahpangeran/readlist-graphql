import { Field, ObjectType } from "type-graphql";
import { Column, Entity } from "typeorm";
import Base from "./Base";

@ObjectType()
@Entity()
export default class ReadList extends Base {
  @Field()
  @Column()
  link!: string;

  @Field()
  @Column()
  title!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  readAt?: Date;

  @Field({ nullable: true })
  @Column("text", { nullable: true })
  comment?: string;
}
