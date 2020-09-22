import { Field, Float, InputType, Int, ObjectType } from "type-graphql";
import { ObjectResponse } from "./base.types";

@InputType()
export class AddProductInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => Int)
  quantity: number;

  @Field(() => Float)
  price: number;

  @Field(() => [String])
  pictures: string[];
}

@ObjectType()
export class AddProductErrors {
  @Field({ nullable: true })
  user?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  quantity?: string;

  @Field({ nullable: true })
  price?: string;

  @Field({ nullable: true })
  pictures?: string;
}

@ObjectType()
export class AddProductData {
  @Field()
  done: boolean;
}

@ObjectType()
export class AddProductResponse extends ObjectResponse(
  AddProductData,
  AddProductErrors
) {}
