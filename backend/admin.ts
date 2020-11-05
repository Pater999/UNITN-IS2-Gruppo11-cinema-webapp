import express from 'express';
import { FareDto} from './models/DTO/FareDto';
import { FakeDatabase } from './Database/fakeDatabase';
 
const router = express.Router();

//#region LoginAdmin

router.post('/login', (req: any, res: express.Response) =>{
    const username = req.body.username;
    const password = req.body.password;

    if (!username) {
        res.status(400).json({ error: 'User not specified' });
        return;
    }

    if (!password) {
        res.status(400).json({ error: 'Password not specified' });
        return;
    }

    if (username == FakeDatabase.Admin.username && password == FakeDatabase.Admin.password) {
        const token = Buffer.from(FakeDatabase.Admin.username + Date.now().toString()).toString('base64');
        res.status(200).json({ token, username });
        return;
    } else {
        res.status(401).json({ error: 'Admin not logged in correctly' });
    }

})

//#endregion

//#region Fares
router.get("/fares", (req: any, res: express.Response) => {
    res.status(200).json(FakeDatabase.Fares);
})

router.post("/fares", (req: any, res: express.Response) => {
    let name = req.body.name;
    let price = Number(req.body.price);
    let desc = req.body.desc;

    if (!name || isNaN(price) || !desc)
        res.status(400).json({ error: "Bad request" });
    else
    {
        let elem = new FareDto(FakeDatabase.Fares.length+1, name, price, desc);
        FakeDatabase.Fares.push(elem);
        res.status(201).json(elem);
    }
});

router.delete("/fares/:fareId", (req, res) => {
    let id = Number(req.params.fareId);
    if(isNaN(id))
        res.status(400).json({ error: "Bad request" });
    else
    {
        let index = FakeDatabase.Fares.findIndex(item => item.Id == id);
        if(index == -1)
            res.status(400).json({ error: "Fare not found" });
        else
        {
            FakeDatabase.Fares.splice(index, 1);
            res.status(200).json({ message: "elemet removed" });
        }
    }
});

//#endregion

export { router as admin };
