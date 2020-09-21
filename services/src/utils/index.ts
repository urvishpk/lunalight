import { Code } from "../types";

export function createObjectResponse<T, U>(
  { success, message }: Code,
  data?: T,
  errors?: U
) {
  const response = {
    success,
    message,
    data,
    errors,
  };
  return response;
}
export function createArrayResponse<T, U>(
  { success, message }: Code,
  data?: T[],
  errors?: U
) {
  const response = {
    success,
    message,
    data,
    errors,
  };
  return response;
}
