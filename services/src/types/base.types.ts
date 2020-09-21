import { ObjectType, Field, ClassType } from "type-graphql";

@ObjectType({ isAbstract: true })
abstract class BaseResponse {
  @Field()
  success: boolean;

  @Field()
  message: string;
}

export function ObjectResponse<T, U>(
  TData: ClassType<T>,
  UError: ClassType<U>
) {
  @ObjectType({ isAbstract: true })
  abstract class ObjectResponse extends BaseResponse {
    @Field(() => TData, { nullable: true })
    data?: T;

    @Field(() => UError, { nullable: true })
    errors?: U;
  }
  return ObjectResponse;
}

export function ArrayResponse<T>(TData: ClassType<T>) {
  @ObjectType({ isAbstract: true })
  abstract class ArrayResponse extends BaseResponse {
    @Field(() => [TData], { nullable: true })
    data?: T[];
  }
  return ArrayResponse;
}
