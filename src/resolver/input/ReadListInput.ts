import { IsUrl, Max, Min } from "class-validator";
import { ArgsType, Field, InputType, Int } from "type-graphql";
import ReadList from "../../model/ReadList";
import { Order } from "./BaseSortFilter";
import {
  ReadListFields,
  ReadListFilter,
  ReadListSort
} from "./ReadListSortFilter";

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
  @Field(_type => Int, { nullable: true })
  @Min(0)
  @Max(100)
  limit = 10;

  @Field(_type => Int, { nullable: true })
  @Min(0)
  @Max(100)
  skip = 0;

  @Field(_type => ReadListSort, {
    nullable: true,
    defaultValue: new ReadListSort(ReadListFields.readAt, Order.DESC)
  })
  sort?: ReadListSort;

  @Field(_type => ReadListFilter, { nullable: true })
  filter?: ReadListFilter;
}
