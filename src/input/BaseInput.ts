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
