import app from "../src/app";
import request from "supertest";

// example tests
describe("register", () => {
  it("return status code 201", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ firstName: "Ivan" })
      .expect(201);
  });
});
