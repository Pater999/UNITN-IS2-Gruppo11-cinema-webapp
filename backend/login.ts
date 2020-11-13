import express from 'express';
import bcrypt from 'bcrypt'; // TODO implement hashing
import { FakeDatabase } from './Database/fakeDatabase';
import { createToken } from './Utilities/authentication';

const router = express.Router();

router.post('', (req: express.Request, res: express.Response) => {
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

  if (username == FakeDatabase.Admin.username && password == FakeDatabase.Admin.password) {
    const token = createToken(username, 'admin');
    res.status(200).json({ token, username, role: 'admin' });
    return;
  } else {
    res.status(401).json({ error: 'Username o Password non corretti!' });
  }
});

export { router as login };