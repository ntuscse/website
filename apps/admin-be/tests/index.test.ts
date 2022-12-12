import app from "../src/server";
import request from "supertest";

// example tests
describe("register", () => {
  it("return status code 201", async () => {
    await request(app.app)
      .get("/auth/signin")
      .send({ firstName: "Ivan" })
      .expect(201);
  });
});
