import { IsUrl, Max, Min } from "class-validator";
import {
  ArgsType,
  Field,
  InputType,
  Int,
  registerEnumType
} from "type-graphql";
import ReadList from "../model/ReadList";
import { ContainsFilter, Sort } from "./BaseInput";

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

enum Fields {
  readAt = "readAt",
  title = "title"
}

registerEnumType(Fields, { name: "Fields" });

@InputType()
class ReadListSort extends Sort {
  @Field(_type => Fields)
  fields!: Fields;
}

@InputType()
class ReadListFilter {
  @Field(_type => ContainsFilter)
  title?: ContainsFilter;

  @Field(_type => ContainsFilter)
  link?: ContainsFilter;

  @Field(_type => ContainsFilter)
  comment?: ContainsFilter;
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
