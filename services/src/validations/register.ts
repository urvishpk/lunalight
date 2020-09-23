import { RegisterErrors, RegisterInput } from "../types/admin.types";
import { isEmpty } from "../utils/isEmpty";
import { errorCodes, regex } from "../constants";

export const validateRegisterInput = ({
  username,
  email,
  password,
  confirmPassword,
}: RegisterInput): RegisterErrors | undefined => {
  const errors: RegisterErrors = {
    username: validateUsername(username),
    email: validateEmail(email),
    password: validatePassword(password),
    confirmPassword: validateConfirmPassword(password, confirmPassword),
  };
  if (
    errors.username ||
    errors.email ||
    errors.password ||
    errors.confirmPassword
  )
    return errors;
  return;
};
const validateUsername = (username: string): string | undefined => {
  const inputError = validateUsernameInput(username);
  if (inputError) return inputError;
  const lengthError = validateUsernameLength(username);
  if (lengthError) return lengthError;
  const regexError = validateUsernameRegex(username);
  if (regexError) return regexError;
  return;
};
const validateUsernameInput = (username: string): string | undefined => {
  if (!isEmpty(username)) return;
  const error = errorCodes.USERNAME_REQUIRED.message;
  return error;
};
const validateUsernameLength = (username: string): string | undefined => {
  if (username.length > 3 && username.length < 30) return;
  const error =
    username.length < 3
      ? errorCodes.SHORT_USERNAME.message
      : errorCodes.LONG_USERNAME.message;
  return error;
};
const validateUsernameRegex = (username: string): string | undefined => {
  if (username.match(regex.USERNAME)) return;
  const error = errorCodes.INVALID_USERNAME.message;
  return error;
};
const validateEmail = (email: string): string | undefined => {
  const inputError = validateEmailInput(email);
  if (inputError) return inputError;
  const regexError = validateEmailRegex(email);
  if (regexError) return regexError;
  return;
};
const validateEmailInput = (email: string): string | undefined => {
  if (!isEmpty(email)) return;
  const error = errorCodes.EMAIL_REQUIRED.message;
  return error;
};
const validateEmailRegex = (email: string): string | undefined => {
  if (email.match(regex.EMAIL)) return;
  const error = errorCodes.INVALID_EMAIL.message;
  return error;
};
const validatePassword = (password: string): string | undefined => {
  const inputError = validatePasswordInput(password);
  if (inputError) return inputError;
  const lengthError = validatePasswordLength(password);
  if (lengthError) return lengthError;
  return;
};
const validatePasswordInput = (password: string): string | undefined => {
  if (!isEmpty(password)) return;
  const error = errorCodes.PASSWORD_REQUIRED.message;
  return error;
};
const validatePasswordLength = (password: string): string | undefined => {
  if (password.length > 6 && password.length < 30) return;
  const error =
    password.length < 6
      ? errorCodes.SHORT_PASSWORD.message
      : errorCodes.LONG_PASSWORD.message;
  return error;
};
const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): string | undefined => {
  const inputError = validateConfirmPasswordInput(confirmPassword);
  if (inputError) return inputError;
  const matchError = validateConfirmPasswordMatch(password, confirmPassword);
  if (matchError) return matchError;
  return;
};
const validateConfirmPasswordInput = (
  confirmPassword: string
): string | undefined => {
  if (!isEmpty(confirmPassword)) return;
  const error = errorCodes.CONFIRM_PASSWORD_REQUIRED.message;
  return error;
};
const validateConfirmPasswordMatch = (
  password: string,
  confirmPassword: string
): string | undefined => {
  if (password === confirmPassword) return;
  const error = errorCodes.PASSWORD_MISMATCH.message;
  return error;
};
