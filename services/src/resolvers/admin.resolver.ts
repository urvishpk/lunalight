import argon2 from "argon2";
import { Resolver, Mutation, Arg, Ctx, Query } from "type-graphql";
import { MikroContext } from "../types";
import {
  RegisterInput,
  RegisterResponse,
  RegisterData,
  RegisterErrors,
  LoginResponse,
  LoginInput,
  LoginData,
  LoginErrors,
  MeResponse,
  MeData,
  MeErrors,
  LogoutResponse,
  LogoutData,
  LogoutErrors,
} from "../types/admin.types";
import errorCodes from "../constants/errorCodes.json";
import codes from "../constants/codes.json";
import { createObjectResponse } from "../utils";
import { Admin } from "../entities/Admin";
import { validateRegisterInput } from "../validations/register";
import { validateLoginInput } from "../validations/login";
import { ObjectId } from "mongodb";
import { COOKIE_NAME } from "../constants";

@Resolver()
export class AdminResolver {
  @Query(() => String)
  async hello(): Promise<String> {
    return "Hello world!";
  }

  @Mutation(() => RegisterResponse)
  async register(
    @Arg("options")
    input: RegisterInput,
    @Ctx() { em }: MikroContext
  ): Promise<RegisterResponse> {
    const errors = validateRegisterInput(input);
    if (errors) {
      const response = createObjectResponse<RegisterData, RegisterErrors>(
        codes.INVALID_INPUT,
        undefined,
        errors
      );
      return response;
    }
    const admin = await em.find(Admin, { username: input.username });
    if (admin.length != 0) {
      const errors: RegisterErrors = {
        username: errorCodes.USERNAME_NOT_AVAILABLE.message,
      };
      const response = createObjectResponse<RegisterData, RegisterErrors>(
        codes.INVALID_INPUT,
        undefined,
        errors
      );
      return response;
    }
    const data = await this.saveAdmin({ em }, input);
    const response = createObjectResponse<RegisterData, RegisterErrors>(
      codes.ADMIN_REGISTERED,
      data
    );
    return response;
  }
  async saveAdmin(
    { em }: MikroContext,
    input: RegisterInput
  ): Promise<RegisterData> {
    const { username, password, email } = input;
    const hashedPassword = await argon2.hash(password);
    const admin = em.create(Admin, {
      username,
      password: hashedPassword,
      email,
    });
    await em.persistAndFlush(admin);
    const data: RegisterData = { username, email };
    return data;
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg("options") input: LoginInput,
    @Ctx() { em, req }: MikroContext
  ): Promise<LoginResponse> {
    const validationErrors = validateLoginInput(input);
    if (validationErrors) {
      const response = createObjectResponse<LoginData, LoginErrors>(
        codes.INVALID_INPUT,
        undefined,
        validationErrors
      );
      return response;
    }
    const { errors, admin } = await this.validateCredentials(input, { em });
    if (errors) {
      const response = createObjectResponse<LoginData, LoginErrors>(
        codes.INVALID_INPUT,
        undefined,
        errors
      );
      return response;
    }
    const data: LoginData = {
      username: admin!.username,
      email: admin!.email,
    };
    const response = createObjectResponse<LoginData, LoginErrors>(
      codes.ADMIN_LOGGED_IN,
      data
    );
    if (req?.session) this.setCookie(req.session, admin!.id);
    return response;
  }
  async validateCredentials(input: LoginInput, { em }: MikroContext) {
    const admin = await em.findOne(Admin, { username: input.username });
    if (!admin) {
      const errors: LoginErrors = {
        username: errorCodes.USER_NOT_FOUND.message,
      };
      return { errors };
    }
    const valid = await argon2.verify(admin.password, input.password);
    if (!valid) {
      const errors: LoginErrors = {
        password: errorCodes.INCORRECT_PASSWORD.message,
      };
      return { errors };
    }
    return { admin };
  }
  setCookie(session: Express.Session, adminId: string) {
    session.userId = adminId;
  }

  @Query(() => MeResponse)
  async me(@Ctx() { req, em }: MikroContext): Promise<MeResponse> {
    if (!req?.session?.userId) {
      const errors: MeErrors = {
        user: errorCodes.NOT_LOGGED_IN.message,
      };
      const response = createObjectResponse<MeData, MeErrors>(
        codes.NOT_LOGGED_IN,
        undefined,
        errors
      );
      return response;
    }
    const admin = await em.findOne(Admin, {
      _id: new ObjectId(req.session.userId),
    });
    if (admin) {
      const data: MeData = {
        username: admin.username,
        email: admin.email,
      };
      const response = createObjectResponse<MeData, MeErrors>(codes.ME, data);
      return response;
    }
    const errors: MeErrors = {
      user: errorCodes.NOT_LOGGED_IN.message,
    };
    const response = createObjectResponse<MeData, MeErrors>(
      codes.NOT_LOGGED_IN,
      undefined,
      errors
    );
    return response;
  }

  @Mutation(() => LogoutResponse)
  logout(@Ctx() { req, res }: MikroContext): LogoutResponse {
    req?.session?.destroy((_) => {});
    res?.clearCookie(COOKIE_NAME);
    const data: LogoutData = {
      done: true,
    };
    const response = createObjectResponse<LogoutData, LogoutErrors>(
      codes.ADMIN_LOGGED_OUT,
      data
    );
    return response;
  }
}
