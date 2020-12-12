import request from "supertest";
import { app } from "./app";
require("dotenv").config();
import { createToken } from "./Utilities/authentication";

//Login

describe("POST /api/v1/login", () => {
  let server: any;
  let agent: request.SuperAgentTest;

  beforeAll((done) => {
    const port = process.env.PORT || 3000;

    server = app.listen(port, () => {
      agent = request.agent(server);
      done();
    });
  });

  afterAll((done) => {
    server.close(done);
  });

  it("POST /api/v1/login should return 400 if account does not exist", async (done) => {
    request(server)
      .post(`/api/v1/login`)
      .set({ username: "TEST" })
      .set({ password: "1234" })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it("POST /api/v1/login should return 400 if fields are empty", async (done) => {
    request(server)
      .post(`/api/v1/login`)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it("POST /api/v1/login should return 400 if password is wrong", async (done) => {
    request(server)
      .post(`/api/v1/login`)
      .set({ username: "gigi" })
      .set({ password: "1234" })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it("POST /api/v1/login should return 200 if username and password are correct", async (done) => {
    request(server)
      .post(`/api/v1/login`)
      .set({ username: "gigi" })
      .set({ password: "gigi" })
      .then((response)=>{
        expect(200);
        done();
      });
  });
});
