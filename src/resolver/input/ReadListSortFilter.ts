import { Field, InputType, registerEnumType } from "type-graphql";
import { FindOneOptions } from "typeorm";
import ReadList from "../../model/ReadList";
import {
  ContainsFilter,
  DateFilter,
  Order,
  Sort,
  withNullFilter
} from "./BaseSortFilter";

export enum ReadListFields {
  readAt = "readAt",
  title = "title"
}

registerEnumType(ReadListFields, { name: "ReadListFields" });

@InputType()
export class ReadListSort extends Sort {
  @Field(_type => ReadListFields)
  fields: ReadListFields;

  constructor(fields: ReadListFields, order: Order) {
    super(order);
    this.fields = fields;
  }

  getSortOptions() {
    const sortOptions: FindOneOptions<ReadList>["order"] = {
      [this.fields]: this.order
    };

    if (this.fields === ReadListFields.readAt) {
      sortOptions.createdAt = this.order;
    }

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
    return Object.fromEntries(
      Object.entries(this)
        .map(([key, value]) => [key, value?.getFilterOptions()])
        .filter(([, value]) => value !== undefined)
    );
  }
}
