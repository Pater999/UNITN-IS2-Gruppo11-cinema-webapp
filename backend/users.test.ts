import request from "supertest";
import { app } from "./app";
require("dotenv").config();
import mongoose from 'mongoose';
import { createToken } from "./Utilities/authentication";

//Users list

describe("GET /api/v1/users", () => {
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

  let adminToken = createToken('PIPPO', 'admin');
  it("GET /api/v1/users should return 200 and a list of users' objects", async (done) => {
    request(server)
      .get('/api/v1/users')
      .set('Authorization', 'Bearer ' + adminToken)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toBeDefined();
        if (res.body[0])
          expect(res.body[0]).toMatchObject({
            _id: expect.anything(),
            Role: expect.anything(),
            Name: expect.anything(),
            Surname: expect.anything(),
            Email: expect.anything()
          });
        done();
      });
  });
});

//User's reservations

describe('GET /api/v1/users/:userId/reservations', () => {
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

  let userToken = createToken('gigi', 'user');

  it('GET /api/v1/users/:userId/reservations should return 403 if userId does not match with local', async (done) => {
    request(server)
      .get(`/api/v1/users/${mongoose.Types.ObjectId()}/reservations`)
      .set('Authorization', 'Bearer ' + userToken)
      .expect(403)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});
