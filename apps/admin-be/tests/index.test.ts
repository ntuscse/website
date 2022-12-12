import app from "../src/app";
import request from "supertest";

// example tests
describe("register", () => {
  it("return status code 201", async () => {
    await request(app)
      .post("/auth/singin")
      .send({ firstName: "Ivan" })
      .expect(201);
  });
});
