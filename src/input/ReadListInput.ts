import { IsUrl, Max, Min } from "class-validator";
import {
  ArgsType,
  Field,
  InputType,
  Int,
  registerEnumType
} from "type-graphql";
import ReadList from "../model/ReadList";
import { ContainsFilter, DateFilter, Sort } from "./BaseInput";

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

enum ReadListFields {
  readAt = "readAt",
  title = "title"
}

registerEnumType(ReadListFields, { name: "ReadListFields" });

@InputType()
class ReadListSort extends Sort {
  @Field(_type => ReadListFields)
  fields!: ReadListFields;
}

@InputType()
class CommentFilter extends ContainsFilter {
  @Field(_type => Boolean, { nullable: true })
  isNull?: boolean;
}

@InputType()
class ReadListFilter {
  @Field(_type => ContainsFilter, { nullable: true })
  title?: ContainsFilter;

  @Field(_type => ContainsFilter, { nullable: true })
  link?: ContainsFilter;

  @Field(_type => CommentFilter, { nullable: true })
  comment?: CommentFilter;

  @Field(_type => DateFilter, { nullable: true })
  readAt?: DateFilter;
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
