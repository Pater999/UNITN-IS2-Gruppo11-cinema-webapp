import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { RegisterDto } from './models/DTO/RegisterDTO';
import Users from './Database/schemas/users';
import { FakeDatabase } from './Database/fakeDatabase';
import { validateTokenAdmin } from './Utilities/authentication';
import { config } from '../config';

const connUri = process.env.MONGO_CONN_URL!;
const dbOptions = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true };
const environment = process.env.NODE_ENV!;
const stage = config[environment];

const router = express.Router();

router.post('', async (req: express.Request, res: express.Response) => {
  const { name, surname, username, email, password } = req.body;

  if (!name || !surname || !username || !email || !password) {
    res.status(400).json({ error: 'Some Fields are null or empty!' });
  } else {
    try {
      const hashedPass = await bcrypt.hash(password, stage.saltingRounds);
      const elem = new RegisterDto(name, surname, username, email, hashedPass);
      let db = null;
      try {
        db = await mongoose.createConnection(connUri, dbOptions);
        const UserMod = db.model('Users', Users);
        const { _id, Username, Role, Name, Surname, Email } = (await UserMod.create(elem)) as any;
        res.status(200).json({ id: _id, Username, Role, Name, Surname, Email });
      } catch (err) {
        res.status(409).json({ error: 'Questo username è stato già utilizzato!' });
      } finally {
        db && db.close();
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error.' });
    }
  }
});

//#region LoginUser
router.post('/login', (req: any, res: express.Response) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username) {
    res.status(400).json({ error: 'Campo Utente vuoto o null' });
    return;
  }

  if (!password) {
    res.status(400).json({ error: 'Campo Password vuoto o null' });
    return;
  }

  if (username == FakeDatabase.User.username && password == FakeDatabase.User.password) {
    const token = Buffer.from(FakeDatabase.User.username + Date.now().toString()).toString('base64');
    res.status(200).json({ token, username });
    return;
  } else {
    res.status(401).json({ error: 'Username o Password non corretti!' });
  }
});

router.get('/users', validateTokenAdmin, (req: any, res: express.Response) => {
  res.status(200).json(FakeDatabase.User);
});

//#endregion

export { router as users };
