import supertest from 'supertest';
import { app } from './app';

test('app module should be defined', () => {
  expect(app).toBeDefined();
});

// test('GET / should return 200', () => {
//   return supertest(app).get('/').expect(200);
// });
