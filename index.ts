import { app } from './backend/app';
import { config } from './config';
import logger from 'morgan';

const environment = process.env.NODE_ENV!;
const stage = config[environment];

if (environment !== 'production') {
  app.use(logger('dev'));
}

app.listen(`${stage.port}`, () => {
  console.log(`Server listening on port ${stage.port}`);
});