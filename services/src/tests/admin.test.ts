import request from "supertest";
import { expect } from "chai";
import { codes, errorCodes } from "../constants";
import { initServer } from "../server";
import { COOKIE_NAME } from "../constants";
import {
  loginMutations,
  logoutMutations,
  meQueries,
  registerMutations,
} from "../constants/testQueries";

describe("Admin Register", () => {
  let app: Express.Application;
  before(async () => {
    app = await initServer();
  });

  it("should respond with errors for invalid input", async () => {
    const result = await request(app)
      .post("/graphql")
      .set("Accept", "application/json")
      .send({
        query: registerMutations[0],
      });
    expect(result.status).to.equal(200);
    const { success, message, data, errors } = result.body.data.register;
    expect(success).to.be.false;
    expect(message).to.equal(codes.INVALID_INPUT.message);
    expect(data).to.be.null;
    expect(errors.username).to.equal(errorCodes.USERNAME_REQUIRED.message);
    expect(errors.email).to.equal(errorCodes.EMAIL_REQUIRED.message);
    expect(errors.password).to.equal(errorCodes.PASSWORD_REQUIRED.message);
    expect(errors.confirmPassword).to.equal(
      errorCodes.CONFIRM_PASSWORD_REQUIRED.message
    );
  });

  it("should register a new admin", async () => {
    const result = await request(app)
      .post("/graphql")
      .set("Accept", "application/json")
      .send({
        query: registerMutations[1],
      });
    expect(result.status).to.equal(200);
    const { success, message, data, errors } = result.body.data.register;
    expect(success).to.be.true;
    expect(message).to.equal(codes.ADMIN_REGISTERED.message);
    expect(data.username).to.equal("urvishpk");
    expect(data.email).to.equal("urvish@urvish.com");
    expect(errors).to.be.null;
  });

  it("should respond with errors for invalid input(username)", async () => {
    const result = await request(app)
      .post("/graphql")
      .set("Accept", "application/json")
      .send({
        query: registerMutations[2],
      });
    expect(result.status).to.equal(200);
    const { success, message, data, errors } = result.body.data.register;
    expect(success).to.be.false;
    expect(message).to.equal(codes.INVALID_INPUT.message);
    expect(data).to.be.null;
    expect(errors.username).to.equal(errorCodes.USERNAME_NOT_AVAILABLE.message);
  });
});

describe("Admin Login", () => {
  let app: Express.Application;
  before(async () => {
    app = await initServer();
  });

  it("should respond with errors for invalid input", async () => {
    const result = await request(app)
      .post("/graphql")
      .set("Accept", "application/json")
      .send({
        query: loginMutations[0],
      });
    expect(result.status).to.equal(200);
    const { success, message, data, errors } = result.body.data.login;
    expect(success).to.be.false;
    expect(message).to.equal(codes.INVALID_INPUT.message);
    expect(data).to.be.null;
    expect(errors.username).to.equal(errorCodes.USERNAME_REQUIRED.message);
    expect(errors.password).to.equal(errorCodes.PASSWORD_REQUIRED.message);
  });

  it("should respond with errors for invalid input(username)", async () => {
    const result = await request(app)
      .post("/graphql")
      .set("Accept", "application/json")
      .send({
        query: loginMutations[1],
      });
    expect(result.status).to.equal(200);
    const { success, message, data, errors } = result.body.data.login;
    expect(success).to.be.false;
    expect(message).to.equal(codes.INVALID_INPUT.message);
    expect(data).to.be.null;
    expect(errors.username).to.equal(errorCodes.USER_NOT_FOUND.message);
  });

  it("should respond with errors for invalid input(password)", async () => {
    const result = await request(app)
      .post("/graphql")
      .set("Accept", "application/json")
      .send({
        query: loginMutations[2],
      });
    expect(result.status).to.equal(200);
    const { success, message, data, errors } = result.body.data.login;
    expect(success).to.be.false;
    expect(message).to.equal(codes.INVALID_INPUT.message);
    expect(data).to.be.null;
    expect(errors.password).to.equal(errorCodes.INCORRECT_PASSWORD.message);
  });

  it("should respond with admin data for valid input", async () => {
    const result = await request(app)
      .post("/graphql")
      .set("Accept", "application/json")
      .send({
        query: loginMutations[3],
      });
    expect(result.status).to.equal(200);
    const { success, message, data, errors } = result.body.data.login;
    expect(success).to.be.true;
    expect(message).to.equal(codes.ADMIN_LOGGED_IN.message);
    expect(errors).to.be.null;
    expect(data.username).to.equal("urvishpk");
    expect(data.email).to.equal("urvish@urvish.com");
    const cookies = result.headers["set-cookie"];
    expect(cookies[0]).to.include(COOKIE_NAME);
  });
});

describe("Me", () => {
  let app: Express.Application;
  before(async () => {
    app = await initServer();
  });

  it("should respond with error", async () => {
    const result = await request(app)
      .post("/graphql")
      .set("Accept", "application/json")
      .send({
        query: meQueries[0],
      });
    expect(result.status).to.equal(200);
    const { success, message, data, errors } = result.body.data.me;
    expect(success).to.be.false;
    expect(message).to.equal(codes.NOT_LOGGED_IN.message);
    expect(data).to.be.null;
    expect(errors.user).to.equal(errorCodes.NOT_LOGGED_IN.message);
  });

  it("should respond with admin", async () => {
    const loginResponse = await request(app)
      .post("/graphql")
      .set("Accept", "application/json")
      .send({
        query: loginMutations[3],
      });
    const cookies = loginResponse.headers["set-cookie"];
    const cookie = cookies[0];
    const result = await request(app)
      .post("/graphql")
      .set("Accept", "application/json")
      .set("cookie", cookie)
      .send({
        query: meQueries[0],
      });
    expect(result.status).to.equal(200);
    const { success, message, data, errors } = result.body.data.me;
    expect(success).to.be.true;
    expect(message).to.equal(codes.ME.message);
    expect(data.username).to.equal("urvishpk");
    expect(data.email).to.equal("urvish@urvish.com");
    expect(errors).to.be.null;
  });
});

describe("Logout", () => {
  let app: Express.Application;
  let cookie: string;
  before(async () => {
    app = await initServer();
    const loginResponse = await request(app)
      .post("/graphql")
      .set("Accept", "application/json")
      .send({
        query: logoutMutations[0],
      });
    cookie = loginResponse.headers["set-cookie"][0];
  });

  it("should clear cookie and destroy the session", async () => {
    const result = await request(app)
      .post("/graphql")
      .set("Accept", "application/json")
      .set("cookie", cookie)
      .send({
        query: `
            mutation Logout {
                logout {
                  success
                  message
                  data {
                    done
                  }
                  errors {
                    done
                  }
                }
              }              
              `,
      });
    expect(result.status).to.equal(200);
    const { success, message, data, errors } = result.body.data.logout;
    expect(success).to.be.true;
    expect(message).to.equal(codes.ADMIN_LOGGED_OUT.message);
    expect(data.done).to.be.true;
    expect(errors).to.be.null;
  });
});
