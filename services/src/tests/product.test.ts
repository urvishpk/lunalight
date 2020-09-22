import request from "supertest";
import { expect } from "chai";
import { initServer } from "../server";
import codes from "../constants/codes.json";
import errorCodes from "../constants/errorCodes.json";
import { addProductMutation, loginMutations } from "../constants/testQueries";

describe("Add Product", () => {
  let app: Express.Application;
  let cookie: string;
  before(async () => {
    app = await initServer();
  });

  it("should respond with errors for unauthorized user", async () => {
    const result = await request(app)
      .post("/graphql")
      .set("Accept", "application/json")
      .send({
        query: addProductMutation[1],
      });
    expect(result.status).to.equal(200);
    const { success, message, data, errors } = result.body.data.addProduct;
    expect(success).to.be.false;
    expect(message).to.equal(codes.UNAUTHORIZED.message);
    expect(data).to.be.null;
    console.log(errors);
    expect(errors.user).to.equal(errorCodes.UNAUTHORIZED.message);
  });

  it("should respond with errors for invalid input", async () => {
    const loginResponse = await request(app)
      .post("/graphql")
      .set("Accept", "application/json")
      .send({
        query: loginMutations[3],
      });
    const cookies = loginResponse.headers["set-cookie"];
    cookie = cookies[0];
    const result = await request(app)
      .post("/graphql")
      .set("Accept", "application/json")
      .set("cookie", cookie)
      .send({
        query: addProductMutation[0],
      });
    expect(result.status).to.equal(200);
    const { success, message, data, errors } = result.body.data.addProduct;
    expect(success).to.be.false;
    expect(message).to.equal(codes.INVALID_INPUT.message);
    expect(data).to.be.null;
    expect(errors.name).to.equal(errorCodes.PRODUCT_NAME_REQUIRED.message);
    expect(errors.description).to.equal(
      errorCodes.PRODUCT_DESCRIPTION_REQUIRED.message
    );
    expect(errors.pictures).to.equal(
      errorCodes.PRODUCT_PICTURES_REQUIRED.message
    );
  });

  it("should add a new product for valid input", async () => {
    const result = await request(app)
      .post("/graphql")
      .set("Accept", "application/json")
      .set("cookie", cookie)
      .send({
        query: addProductMutation[1],
      });
    expect(result.status).to.equal(200);
    const { success, message, data, errors } = result.body.data.addProduct;
    expect(success).to.be.true;
    expect(message).to.equal(codes.PRODUCT_ADDED.message);
    expect(data.done).to.be.true;
    expect(errors).to.be.null;
  });
});
