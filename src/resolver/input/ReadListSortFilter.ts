import { Field, InputType, registerEnumType } from "type-graphql";
import { FindOneOptions } from "typeorm";
import ReadList from "../../model/ReadList";
import {
  ContainsFilter,
  DateFilter,
  Sort,
  withNullFilter
} from "./BaseSortFilter";

enum ReadListFields {
  readAt = "readAt",
  title = "title"
}

registerEnumType(ReadListFields, { name: "ReadListFields" });

@InputType()
export class ReadListSort extends Sort {
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
class CommentFilter extends withNullFilter(ContainsFilter) {
  getFilterOptions() {
    const filterValue = super.getFilterOptions();
    return super.getWithNullOptions(filterValue);
  }
}

@InputType()
class ReadAtFilter extends withNullFilter(DateFilter) {
  getFilterOptions() {
    const filterValue = super.getFilterOptions();
    return super.getWithNullOptions(filterValue);
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
