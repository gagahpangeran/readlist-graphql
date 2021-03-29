import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import Base from "./Base";

@ObjectType()
@Entity()
export default class ReadList extends Base {
  @Field(_type => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

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
