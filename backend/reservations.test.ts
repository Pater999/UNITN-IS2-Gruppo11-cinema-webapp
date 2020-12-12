import request from 'supertest';
import { app } from './app';
require('dotenv').config();
import { createToken } from './Utilities/authentication';

describe('GET /api/v1/reservations', () => {
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

  it('GET /api/v1/reservations should return 401 if no jwt token is sent', async (done) => {
    request(server)
      .get(`/api/v1/reservations`)
      .expect(401)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  const adminToken = createToken('PIPPO', 'admin');

  it('GET /api/v1/reservations should return 200 and a collection of reservations if jwt admin token is sent', async (done) => {
    request(server)
      .get(`/api/v1/reservations`)
      .set('Authorization', 'Bearer ' + adminToken)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toBeDefined();
        if (res.body[0])
          expect(res.body[0]).toMatchObject({
            reservationId: expect.anything(),
            date: expect.anything(),
            movieTitle: expect.anything(),
            movieId: expect.anything(),
            user: expect.objectContaining({
              _id: expect.anything(),
              Role: expect.anything(),
              Name: expect.anything(),
              Surname: expect.anything(),
              Username: expect.anything(),
              Email: expect.anything()
            }),
            fare: expect.objectContaining({
              _id: expect.anything(),
              name: expect.anything(),
              price: expect.anything(),
              desc: expect.anything()
            })
          });
        done();
      });
  });

  it('GET /api/v1/reservations should return 400 if endDate or startDate query params are not valid date', async (done) => {
    request(server)
      .get(`/api/v1/reservations`)
      .set('Authorization', 'Bearer ' + adminToken)
      .query({ startDate: 'Test1', endDate: 'Test2' })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('GET /api/v1/reservations should return 200 if endDate query param is a valid date', async (done) => {
    request(server)
      .get(`/api/v1/reservations`)
      .set('Authorization', 'Bearer ' + adminToken)
      .query({ endDate: '2010/11/01' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('GET /api/v1/reservations should return 400 if movieId is in bad format', async (done) => {
    request(server)
      .get(`/api/v1/reservations`)
      .set('Authorization', 'Bearer ' + adminToken)
      .query({ movieId: '5fc525fc8d23ca12703bb54' })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('GET /api/v1/reservations should return 200 if movieId is in the right format', async (done) => {
    request(server)
      .get(`/api/v1/reservations`)
      .set('Authorization', 'Bearer ' + adminToken)
      .query({ movieId: "5fc525fc8d23ca12703bb54a" })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toBeDefined();
        done();
      });
  });
});
