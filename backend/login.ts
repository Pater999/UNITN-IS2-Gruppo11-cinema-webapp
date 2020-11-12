import express from 'express';
import { FakeDatabase } from './Database/fakeDatabase';

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
    const token = Buffer.from(FakeDatabase.Admin.username + Date.now().toString()).toString('base64');
    res.status(200).json({ token, username });
    return;
  } else {
    res.status(401).json({ error: 'Username o Password non corretti!' });
  }
});

export { router as login };