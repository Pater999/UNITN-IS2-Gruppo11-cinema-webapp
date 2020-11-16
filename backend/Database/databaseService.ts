import { config } from "../../config";

const connUri = process.env.MONGO_CONN_URL!;
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};
const environment = process.env.NODE_ENV!;
const stage = config[environment];

export { connUri, dbOptions, stage };
