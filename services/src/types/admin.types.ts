import { InputType, Field, ObjectType } from "type-graphql";
import { ObjectResponse } from "./base.types";

@InputType()
export class RegisterInput {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  confirmPassword: string;
}

@ObjectType()
export class RegisterData {
  @Field()
  username: string;

  @Field()
  email: string;
}

@ObjectType()
export class RegisterErrors {
  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  password?: string;

  @Field({ nullable: true })
  confirmPassword?: string;
}

@InputType()
export class LoginInput {
  @Field()
  username: string;

  @Field()
  password: string;
}

@ObjectType()
export class LoginData {
  @Field()
  username: string;

  @Field()
  email: string;
}

@ObjectType()
export class LoginErrors {
  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  password?: string;
}

@ObjectType()
export class MeData {
  @Field()
  username: string;

  @Field()
  email: string;
}

@ObjectType()
export class MeErrors {
  @Field()
  user: string;
}

@ObjectType()
export class LogoutData {
  @Field()
  done: boolean;
}

@ObjectType()
export class LogoutErrors {
  @Field()
  done: boolean;
}

@ObjectType()
export class RegisterResponse extends ObjectResponse(
  RegisterData,
  RegisterErrors
) {}

@ObjectType()
export class LoginResponse extends ObjectResponse(LoginData, LoginErrors) {}

@ObjectType()
export class MeResponse extends ObjectResponse(MeData, MeErrors) {}

@ObjectType()
export class LogoutResponse extends ObjectResponse(LogoutData, LogoutErrors) {}
