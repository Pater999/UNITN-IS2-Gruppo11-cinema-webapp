import request from 'supertest';
import { app } from './app';
require('dotenv').config();
import mongoose from 'mongoose';
import { createToken } from './Utilities/authentication';

// Movies

describe('/api/v1/movies', () => {
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

  it('GET /api/v1/movies should return 200 and a list of movies ', async (done) => {
    request(server)
      .get(`/api/v1/movies`)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toBeDefined();
        if (res.body[0])
          expect(res.body[0]).toMatchObject({
            _id: expect.anything(),
            title: expect.anything(),
            desc: expect.anything(),
            imageUrl: expect.anything(),
            plans: expect.arrayContaining([
              expect.objectContaining({
                _id: expect.anything(),
                date: expect.anything(),
                room: expect.objectContaining({
                  _id: expect.anything(),
                  name: expect.anything()
                })
              })
            ])
          });
        done();
      });
  });
});

// Reservations

describe('POST /api/v1/movies/:movieId/plannings/:planId/reservations', () => {
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

  it('POST /api/v1/movies/:movieId/plannings/:planId/reservations should return 401 if no jwt token is sent', async (done) => {
    request(server)
      .post(`/api/v1/movies/${mongoose.Types.ObjectId()}/plannings/${mongoose.Types.ObjectId()}/reservations`)
      .expect(401)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  let userToken = createToken('gigi', 'user');
  it('POST /api/v1/movies/:movieId/plannings/:planId/reservations should return 400 if the token role is valid and the body is invalid', async (done) => {
    request(server)
      .post(`/api/v1/movies/${mongoose.Types.ObjectId()}/plannings/${mongoose.Types.ObjectId()}/reservations`)
      .set('Authorization', 'Bearer ' + userToken)
      .send({ userId: mongoose.Types.ObjectId() })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});
