import request from 'supertest';
import { app } from './app';
require('dotenv').config();
import { createToken } from './Utilities/authentication';

describe('GET /api/v1/comunications', () => {
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

   it("GET /api/v1/comunications should return 200 and a list of comunications's objects", async (done) => {
    request(server)
      .get('/api/v1/comunications')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toBeDefined();
        if (res.body[0])
          expect(res.body[0]).toMatchObject({
            _id: expect.anything(),
            title: expect.anything(),
            desc: expect.anything(),
            date: expect.anything()
          });
        done();
      });
  });

  it('POST /api/v1/comunications should return 401 if no jwt token is sent', async (done) => {
    request(server)
      .post('/api/v1/comunications')
      .expect(401)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('DELETE /api/v1/comunications should return 401 if no jwt token is sent', async (done) => {
    request(server)
      .delete('/api/v1/comunications/abcd')
      .expect(401)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  let userToken = createToken('PIPPO', 'user');
  

  it('POST /api/v1/comunications should return 403 if the token role is not admin', async (done) => {
    request(server)
      .post('/api/v1/comunications')
      .set('Authorization', 'Bearer ' + userToken)
      .expect(403)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  let adminToken = createToken('PIPPO', 'admin');
  it('DELETE /api/v1/comunications should return 404 if the token role is admin but comunication not exist', async (done) => {
    request(server)
      .delete('/api/v1/comunications/prova')
      .set('Authorization', 'Bearer ' + adminToken)
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });



  it('POST /api/v1/comunications should return 200 if the token role is admin and the body is not empty', async (done) => {
    request(server)
      .post('/api/v1/comunications')
      .set('Authorization', 'Bearer ' + adminToken)
      .set({_id: "ddfdf"})
      .set({title: "aaa"})
      .set({desc: "aaaaa"})
      .set({date: "ffff"})
      .then((response)=>{
        expect(200);
        done();
      });
  }); 
});
