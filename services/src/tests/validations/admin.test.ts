import { expect } from "chai";
import errorCodes from "../../constants/errorCodes.json";
import { LoginErrors, RegisterErrors } from "../../types/admin.types";
import { validateRegisterInput } from "../../validations/register";
import { validateLoginInput } from "../../validations/login";

describe("Validations for Admin Registration", () => {
  it("should return errors for empty input", () => {
    const errors: RegisterErrors | undefined = validateRegisterInput({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    expect(errors).to.not.be.undefined;
    expect(errors!.username).to.equal(errorCodes.USERNAME_REQUIRED.message);
    expect(errors!.email).to.equal(errorCodes.EMAIL_REQUIRED.message);
    expect(errors!.password).to.equal(errorCodes.PASSWORD_REQUIRED.message);
    expect(errors!.confirmPassword).to.equal(
      errorCodes.CONFIRM_PASSWORD_REQUIRED.message
    );
  });

  it("should return errors for empty field and white space as input", () => {
    const errors: RegisterErrors | undefined = validateRegisterInput({
      username: "     ",
      password: "12345678",
      confirmPassword: "",
      email: " ",
    });
    expect(errors!.username).to.equal(errorCodes.USERNAME_REQUIRED.message);
    expect(errors!.email).to.equal(errorCodes.EMAIL_REQUIRED.message);
    expect(errors!.password).to.be.undefined;
    expect(errors!.confirmPassword).to.equal(
      errorCodes.CONFIRM_PASSWORD_REQUIRED.message
    );
  });

  it("should return error for short username", () => {
    const errors: RegisterErrors | undefined = validateRegisterInput({
      username: "j",
      email: "john@gmail.com",
      password: "12345678",
      confirmPassword: "12345678",
    });
    expect(errors?.username).to.equal(errorCodes.SHORT_USERNAME.message);
  });

  it("should return error for long username", () => {
    const errors: RegisterErrors | undefined = validateRegisterInput({
      username: "johnjohnjohnjohnjohnjohnjohnjohn",
      email: "john@gmail.com",
      password: "12345678",
      confirmPassword: "12345678",
    });
    expect(errors?.username).to.equal(errorCodes.LONG_USERNAME.message);
  });

  it("should return error for invalid username(white space)", () => {
    const errors: RegisterErrors | undefined = validateRegisterInput({
      username: "john doe",
      email: "john@gmail.com",
      password: "12345678",
      confirmPassword: "12345678",
    });
    expect(errors?.username).to.equal(errorCodes.INVALID_USERNAME.message);
  });

  it("should return error for invalid username(special character)", () => {
    const errors: RegisterErrors | undefined = validateRegisterInput({
      username: "john-doe",
      email: "john@gmail.com",
      password: "12345678",
      confirmPassword: "12345678",
    });
    expect(errors?.username).to.equal(errorCodes.INVALID_USERNAME.message);
  });

  it("should return no error for username(alpha)", () => {
    const errors: RegisterErrors | undefined = validateRegisterInput({
      username: "johndoe",
      email: "john@gmail.com",
      password: "12345678",
      confirmPassword: "12345678",
    });
    expect(errors?.username).to.be.undefined;
  });

  it("should return no error for username(alphanumeric)", () => {
    const errors: RegisterErrors | undefined = validateRegisterInput({
      username: "john123",
      email: "john@gmail.com",
      password: "12345678",
      confirmPassword: "12345678",
    });
    expect(errors?.username).to.be.undefined;
  });

  it("should return no error for username(alpha underscore)", () => {
    const errors: RegisterErrors | undefined = validateRegisterInput({
      username: "john_doe",
      email: "john@gmail.com",
      password: "12345678",
      confirmPassword: "12345678",
    });
    expect(errors?.username).to.be.undefined;
  });

  it("should return error for invalid email ID", () => {
    const errors: RegisterErrors | undefined = validateRegisterInput({
      username: "john_doe",
      email: "John Doe",
      password: "12345678",
      confirmPassword: "12345678",
    });
    expect(errors?.email).to.equal(errorCodes.INVALID_EMAIL.message);
  });

  it("should return no error for email", () => {
    const errors: RegisterErrors | undefined = validateRegisterInput({
      username: "john_doe",
      email: "john@doe.com",
      password: "12345678",
      confirmPassword: "12345678",
    });
    expect(errors?.email).to.be.undefined;
  });

  it("should return error for too short password", () => {
    const errors: RegisterErrors | undefined = validateRegisterInput({
      username: "john_doe",
      email: "john@doe.com",
      password: "1",
      confirmPassword: "12345678",
    });
    expect(errors?.password).to.equal(errorCodes.SHORT_PASSWORD.message);
  });

  it("should return error for too long password", () => {
    const errors: RegisterErrors | undefined = validateRegisterInput({
      username: "john_doe",
      email: "john@doe.com",
      password: "123456789123456789123456789123456789",
      confirmPassword: "12345678",
    });
    expect(errors?.password).to.equal(errorCodes.LONG_PASSWORD.message);
  });

  it("should return no error for password", () => {
    const errors: RegisterErrors | undefined = validateRegisterInput({
      username: "john_doe",
      email: "john@doe.com",
      password: "12346578",
      confirmPassword: "",
    });
    expect(errors?.password).to.be.undefined;
  });

  it("should return error for not matching with password", () => {
    const errors: RegisterErrors | undefined = validateRegisterInput({
      username: "john_doe",
      email: "john@doe.com",
      password: "12345678",
      confirmPassword: "1234567",
    });
    expect(errors?.confirmPassword).to.equal(
      errorCodes.PASSWORD_MISMATCH.message
    );
  });

  it("should return no error for confirm password", () => {
    const errors: RegisterErrors | undefined = validateRegisterInput({
      username: "",
      email: "john@doe.com",
      password: "12345678",
      confirmPassword: "12345678",
    });
    expect(errors?.confirmPassword).to.be.undefined;
  });

  it("should return no error for valid register input", () => {
    const errors: RegisterErrors | undefined = validateRegisterInput({
      username: "johndoe",
      email: "johndoe@gmail.com",
      password: "12345678",
      confirmPassword: "12345678",
    });
    expect(errors).to.be.undefined;
  });
});

describe("Validations for Admin Login", () => {
  it("should return errors for empty input", () => {
    const errors: LoginErrors | undefined = validateLoginInput({
      username: "",
      password: "",
    });
    expect(errors).to.not.be.undefined;
    expect(errors?.username).to.equal(errorCodes.USERNAME_REQUIRED.message);
    expect(errors?.password).to.equal(errorCodes.PASSWORD_REQUIRED.message);
  });

  it("should return errors for empty field and white space as input", () => {
    const errors: RegisterErrors | undefined = validateLoginInput({
      username: "     ",
      password: "12345678",
    });
    expect(errors?.username).to.equal(errorCodes.USERNAME_REQUIRED.message);
    expect(errors?.password).to.be.undefined;
  });

  it("should return no error for valid login input", () => {
    const errors: RegisterErrors | undefined = validateLoginInput({
      username: "johndoe",
      password: "12345678",
    });
    expect(errors).to.be.undefined;
  });
});
