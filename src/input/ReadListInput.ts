import { IsUrl, Max, Min } from "class-validator";
import {
  ArgsType,
  Field,
  InputType,
  Int,
  registerEnumType
} from "type-graphql";
import { FindOneOptions } from "typeorm";
import ReadList from "../model/ReadList";
import {
  ContainsFilter,
  DateFilter,
  getWithNullOptions,
  Sort
} from "./BaseInput";

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

  getSortOptions() {
    const sortOptions: FindOneOptions<ReadList>["order"] = {
      [this.fields]: this.order,
      createdAt: this.order
    };
    return sortOptions;
  }
}

@InputType()
class CommentFilter extends ContainsFilter {
  @Field(_type => Boolean, { nullable: true })
  isNull?: boolean;

  getFilterOptions() {
    const filterValue = super.getFilterOptions();
    return getWithNullOptions(this.isNull, filterValue);
  }
}

@InputType()
class ReadAtFilter extends DateFilter {
  @Field(_type => Boolean, { nullable: true })
  isNull?: boolean;

  getFilterOptions() {
    const filterValue = super.getFilterOptions();
    return getWithNullOptions(this.isNull, filterValue);
  }
}

@InputType()
export class ReadListFilter {
  @Field(_type => ContainsFilter, { nullable: true })
  title?: ContainsFilter;

  @Field(_type => ContainsFilter, { nullable: true })
  link?: ContainsFilter;

  @Field(_type => CommentFilter, { nullable: true })
  comment?: CommentFilter;

  @Field(_type => ReadAtFilter, { nullable: true })
  readAt?: ReadAtFilter;

  getFilterOptions() {
    const filterOptions: FindOneOptions<ReadList>["where"] = {};

    const titleOptions = this.title?.getFilterOptions();
    if (titleOptions !== undefined) {
      filterOptions.title = titleOptions;
    }

    const linkOptions = this.link?.getFilterOptions();
    if (linkOptions !== undefined) {
      filterOptions.link = linkOptions;
    }

    const readAtOptions = this.readAt?.getFilterOptions();
    if (readAtOptions !== undefined) {
      filterOptions.readAt = readAtOptions;
    }

    const commentOptions = this.comment?.getFilterOptions();
    if (commentOptions !== undefined) {
      filterOptions.comment = commentOptions;
    }

    return filterOptions;
  }
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
