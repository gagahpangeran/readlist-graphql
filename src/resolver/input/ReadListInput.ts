import { IsUrl, Max, Min } from "class-validator";
import { ArgsType, Field, InputType, Int } from "type-graphql";
import ReadList from "../../model/ReadList";
import { ReadListFilter, ReadListSort } from "./ReadListSortFilter";

@InputType()
export class ReadListInput implements Partial<ReadList> {
  @IsUrl()
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
export class ReadListArgs {
  @Field(_type => Int)
  @Min(0)
  @Max(100)
  limit = 100;

  @Field(_type => Int)
  @Min(0)
  @Max(100)
  skip = 0;

  @Field(_type => ReadListSort, { nullable: true })
  sort?: ReadListSort;

  @Field(_type => ReadListFilter, { nullable: true })
  filter?: ReadListFilter;
}