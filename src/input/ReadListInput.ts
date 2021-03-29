import { ArgsType, Field, InputType, Int } from "type-graphql";
import ReadList from "../model/ReadList";
import { ReadListServiceArgs } from "../service/ReadListService";

@InputType()
export class ReadListInput implements Partial<ReadList> {
  @Field()
  link!: string;

  @Field()
  title!: string;

  @Field({ nullable: true })
  readAt?: Date;

  @Field({ nullable: true })
  comment?: string;
}

@ArgsType()
export class ReadListArgs implements ReadListServiceArgs {
  @Field(_type => Int, { defaultValue: 10 })
  limit!: number;

  @Field(_type => Int, { defaultValue: 0 })
  skip!: number;
}
