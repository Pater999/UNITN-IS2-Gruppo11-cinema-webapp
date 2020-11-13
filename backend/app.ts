import express from 'express';

import { login } from './login';
import { fares } from './fares';
import { rooms } from './rooms';
import { movies } from './movies';
import { users } from './users';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS BYPASS
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

/**
 * Middleware to manage authentication
 * https://expressjs.com/it/guide/writing-middleware.html
 * https://expressjs.com/it/guide/using-middleware.html
 */
app.use((req: any, res: express.Response, next: express.NextFunction) => {
  req.loggedUser = req.query.user;
  next();
});

app.use('/api/v1/login', login);
app.use('/api/v1/fares', fares);
app.use('/api/v1/rooms', rooms);
app.use('/api/v1/movies', movies);
app.use('/api/v1/users', users);

/* Default 404 handler */
app.use((req: express.Request, res: express.Response) => {
  res.status(404);
  res.json({ error: 'Not found' });
});

export { app };
