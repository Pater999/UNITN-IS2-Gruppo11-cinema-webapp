import express from 'express';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import Users from './Database/schemas/users';
import { createToken } from './Utilities/authentication';
import { connUri, dbOptions } from './Database/databaseService';


const router = express.Router();

router.post('', async (req: express.Request, res: express.Response) => {
  const { username, password } = req.body;

  if (!username) {
    res.status(400).json({ error: 'Campo Utente vuoto o null' });
    return;
  }
  if (!password) {
    res.status(400).json({ error: 'Campo Password vuoto o null' });
    return;
  }

  let db = null;
  try {
    db = await mongoose.createConnection(connUri, dbOptions);
    const UserMod = db.model('Users', Users);
    const user = (await UserMod.findOne({ Username: username }));
    if (!user) res.status(404).json({ error: 'Username not found' });
    else {
      const equals = await bcrypt.compare(password, user.get("Password"));
      if (equals) {
        const token = createToken(username, user.get("Role"));
        res.status(200).json({ token, username: user.get("Username"), role: user.get("Role") });
      } else {
        res.status(401).json({ error: 'Password non corretta' });
      }
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error.' });
  } finally {
    db && db.close();
  }
});

export { router as login };
