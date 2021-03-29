import { Field, InputType, registerEnumType } from "type-graphql";

export enum Order {
  ASC = "ASC",
  DESC = "DESC"
}

registerEnumType(Order, { name: "Order" });

@InputType()
export class Sort {
  @Field(_type => Order)
  order!: Order;
}

@InputType()
export class ContainsFilter {
  @Field(_type => String, { nullable: true })
  contains?: string;
}

@InputType()
export class DateFilter {
  @Field(_type => Date, { nullable: true })
  before?: Date;

  @Field(_type => Date, { nullable: true })
  after?: Date;
}
