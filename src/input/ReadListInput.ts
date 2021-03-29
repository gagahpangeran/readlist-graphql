import { Max, Min } from "class-validator";
import {
  ArgsType,
  Field,
  InputType,
  Int,
  registerEnumType
} from "type-graphql";
import ReadList from "../model/ReadList";
import { Sort } from "./BaseInput";

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
}
