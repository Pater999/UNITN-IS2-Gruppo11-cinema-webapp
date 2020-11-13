import express from 'express';
import { FakeDatabase } from './Database/fakeDatabase';


const router = express.Router();

//#region LoginUser

router.post('/login', (req: any, res: express.Response) =>{
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

})

router.get("/users", (req: any, res: express.Response) => {
    res.status(200).json(FakeDatabase.User);
})

//#endregion


export { router as users };