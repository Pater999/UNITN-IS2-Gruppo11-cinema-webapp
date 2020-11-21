import { app } from './backend/app';
import { config } from './config';

const environment = process.env.NODE_ENV!;
const stage = config[environment];

app.listen(`${stage.port}`, () => {
  console.log(`Server listening on port ${stage.port}`);
});