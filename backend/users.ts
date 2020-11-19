import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { RegisterDto } from './models/DTO/RegisterDTO';
import Users from './Database/schemas/users';
import { connUri, dbOptions, stage } from './Database/databaseService';


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
        res.status(201).json({ id: _id, Username, Role, Name, Surname, Email });
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

export { router as users };
