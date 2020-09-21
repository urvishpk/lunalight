import {
  PrimaryKey,
  SerializedPrimaryKey,
  Property,
  Entity,
} from "@mikro-orm/core";
import { ObjectId } from "@mikro-orm/mongodb";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType({ isAbstract: true })
@Entity()
export abstract class BaseEntity {
  @Field(() => ID)
  @PrimaryKey()
  _id!: ObjectId;

  @Field()
  @SerializedPrimaryKey()
  id!: string;

  @Field(() => String)
  @Property()
  createdAt = new Date();

  @Field(() => String)
  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}
