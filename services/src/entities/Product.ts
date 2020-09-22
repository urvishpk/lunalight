import { ArrayType, Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity";
import { ObjectType, Field, Int, Float } from "type-graphql";

@ObjectType({ description: "Product model" })
@Entity()
export class Product extends BaseEntity {
  @Field()
  @Property({ type: "text" })
  name!: string;

  @Field()
  @Property({ type: "text" })
  description!: string;

  @Field(() => Int)
  @Property()
  quantity!: number;

  @Field(() => Float)
  @Property()
  price!: number;

  @Field(() => [String])
  @Property({ type: ArrayType })
  pictures!: string[];
}
