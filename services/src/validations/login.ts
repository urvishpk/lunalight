import { LoginErrors, LoginInput } from "../types/admin.types";
import { isEmpty } from "../utils/isEmpty";
import { errorCodes } from "../constants";

export const validateLoginInput = ({
  username,
  password,
}: LoginInput): LoginErrors | undefined => {
  const errors: LoginErrors = {
    username: validateUsername(username),
    password: validatePassword(password),
  };
  if (errors.username || errors.password) return errors;
  return;
};

const validateUsername = (username: string): string | undefined => {
  if (!isEmpty(username)) return;
  const error = errorCodes.USERNAME_REQUIRED.message;
  return error;
};

const validatePassword = (password: string): string | undefined => {
  if (!isEmpty(password)) return;
  const error = errorCodes.PASSWORD_REQUIRED.message;
  return error;
};
