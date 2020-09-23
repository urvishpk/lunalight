import request from "supertest";
import { expect } from "chai";
import { codes } from "../constants";
import { initServer } from "../server";

describe("Server test", () => {
  let app: Express.Application;
  before(async () => {
    app = await initServer();
  });

  it("should test the server availability", async () => {
    const result = await request(app).get("/");
    expect(result.text).to.equal(codes.SERVER.message);
  });
});
