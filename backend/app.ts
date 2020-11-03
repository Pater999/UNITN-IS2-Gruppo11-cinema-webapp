import express from 'express';

import { films } from './films';
// ...

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

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
// ...

/* Default 404 handler */
app.use((req: express.Request, res: express.Response) => {
  res.status(404);
  res.json({ error: 'Not found' });
});

export { app };
