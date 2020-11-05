import express from 'express';

import { films } from './films';
import { admin } from './admin';
// ...

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS BYPASS
app.use((req: any, res: express.Response, next: express.NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
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

app.use('/api/v1/films', films);
app.use('/api/v1/admin', admin);

/* Default 404 handler */
app.use((req: express.Request, res: express.Response) => {
  res.status(404);
  res.json({ error: 'Not found' });
});

export { app };
