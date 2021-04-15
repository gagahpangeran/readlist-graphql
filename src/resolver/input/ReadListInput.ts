import { IsDate, IsUrl, Max, Min } from "class-validator";
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

  @IsDate()
  @Field({ nullable: true })
  readAt?: Date;

  @Field({ nullable: true })
  comment?: string;

  get cleanInput(): ReadListInputData {
    return {
      link: this.link.trim(),
      title: this.title.trim(),
      readAt: this.readAt,
      comment: this.comment?.trim()
    };
  }
}

export type ReadListInputData = Omit<ReadListInput, "cleanInput">;

@ArgsType()
export class ReadListArgs {
  @Field(_type => Int, { nullable: true })
  @Min(0)
  @Max(100)
  limit = 10;

  @Field(_type => Int, { nullable: true })
  @Min(0)
  skip = 0;

  @Field(_type => ReadListSort, {
    nullable: true,
    defaultValue: new ReadListSort(ReadListFields.readAt, Order.DESC)
  })
  sort?: ReadListSort;

  @Field(_type => ReadListFilter, { nullable: true })
  filter?: ReadListFilter;
}
