import express from 'express';
import { FakeDatabase } from './Database/fakeDatabase';
import { FareDto } from './models/DTO/FareDto';

const router = express.Router();

router.get("", (req: express.Request, res: express.Response) => {
    res.status(200).json(FakeDatabase.Fares);
})

router.post("", (req: express.Request, res: express.Response) => {
    let name = req.body.name;
    let price = Number(req.body.price);
    let desc = req.body.desc;

    if (!name || isNaN(price) || !desc)
        res.status(400).json({ error: "Some Fields are null or empty!" });
    else
    {
        let elem = new FareDto(FakeDatabase.Fares.length+1, name, price, desc);
        FakeDatabase.Fares.push(elem);
        res.status(201).json(elem);
    }
});

router.delete("/:fareId", (req: express.Request, res: express.Response) => {
    let id = Number(req.params.fareId);
    if(isNaN(id))
        res.status(400).json({ error: "Some Fields are null or empty!" });
    else
    {
        if(FakeDatabase.Fares.length > 1)
        {
            let index = FakeDatabase.Fares.findIndex(item => item.Id == id);
            if(index == -1)
                res.status(404).json({ error: "Tariffa non trovata!" });
            else
            {
                FakeDatabase.Fares.splice(index, 1);
                res.status(200).json({ message: "Tariffa rimossa con successo!" });
            }
        }
        else
        {
            res.status(409).json({ error: "Deve esserci almeno una Tariffa!" });
        }
    }
});

export { router as fares };