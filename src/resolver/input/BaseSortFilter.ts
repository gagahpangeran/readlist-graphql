import { ClassType, Field, InputType, registerEnumType } from "type-graphql";
import {
  Between,
  IsNull,
  LessThanOrEqual,
  Like,
  MoreThanOrEqual,
  Not
} from "typeorm";

export enum Order {
  ASC = "ASC",
  DESC = "DESC"
}

registerEnumType(Order, { name: "Order" });

@InputType()
export class Sort {
  @Field(_type => Order)
  order: Order;

  constructor(order: Order) {
    this.order = order;
  }
}

@InputType()
export class ContainsFilter {
  @Field(_type => String, { nullable: true })
  contains?: string;

  getFilterOptions() {
    if (this.contains !== undefined) {
      return Like(`%${this.contains}%`);
    }

    return undefined;
  }
}

@InputType()
export class DateFilter {
  @Field(_type => Date, { nullable: true })
  from?: Date;

  @Field(_type => Date, { nullable: true })
  to?: Date;

  getFilterOptions() {
    if (this.from !== undefined && this.to !== undefined) {
      return Between(this.from, this.to);
    }

    if (this.from !== undefined && this.to === undefined) {
      return MoreThanOrEqual(this.from);
    }

    if (this.from === undefined && this.to !== undefined) {
      return LessThanOrEqual(this.to);
    }

    return undefined;
  }
}

export function withNullFilter<TClassType extends ClassType>(
  BaseClass: TClassType
) {
  @InputType({ isAbstract: true })
  class WithNullFilter extends BaseClass {
    @Field(_type => Boolean, { nullable: true })
    isNull?: boolean;

    getWithNullOptions<T>(filterValue?: T) {
      switch (this.isNull) {
        case true:
          return IsNull();
        case false:
          if (filterValue === undefined) {
            return Not(IsNull());
          }
          return filterValue;
        case undefined:
        default:
          return filterValue;
      }
    }
  }

  return WithNullFilter;
}
