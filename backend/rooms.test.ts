import request from 'supertest';
import { app } from './app';
require('dotenv').config();
import { createToken } from './Utilities/authentication';

describe('GET /api/v1/rooms', () => {
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

  it("GET /api/v1/rooms should return 200 and a list of rooms", async (done) => {
    request(server)
      .get('/api/v1/rooms')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toBeDefined();
        if (res.body[0])
          expect(res.body[0]).toMatchObject({
            _id: expect.anything(),
            name: expect.anything(),
            seatsNumber: expect.anything(),
          });
        done();
      });
  });

  it('POST /api/v1/rooms should return 401 if no jwt token is sent', async (done) => {
    request(server)
      .post('/api/v1/rooms')
      .expect(401)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('DELETE /api/v1/rooms should return 401 if no jwt token is sent', async (done) => {
    request(server)
      .delete('/api/v1/rooms/abcd')
      .expect(401)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  let userToken = createToken('PIPPO', 'user');

  it('POST /api/v1/rooms should return 403 if the token role is not admin', async (done) => {
    request(server)
      .post('/api/v1/rooms')
      .set('Authorization', 'Bearer ' + userToken)
      .expect(403)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('DELETE /api/v1/rooms should return 403 if the token role is not admin', async (done) => {
    request(server)
      .delete('/api/v1/rooms/abc')
      .set('Authorization', 'Bearer ' + userToken)
      .expect(403)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  let adminToken = createToken('PIPPO', 'admin');

  it('POST /api/v1/rooms should return 400 if the token role is admin and the body is empty', async (done) => {
    request(server)
      .post('/api/v1/rooms')
      .set('Authorization', 'Bearer ' + adminToken)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('PUT /api/v1/rooms/1 should return 404 if the token role is admin and the room doesn\'t exists', async (done) => {
    request(server)
      .put('/api/v1/rooms/1')
      .send({ name: "pippo" })
      .set('Authorization', 'Bearer ' + adminToken)
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});
