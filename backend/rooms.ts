import express from 'express';
import { FakeDatabase } from './Database/fakeDatabase';
import { RoomDTO } from './models/DTO/RoomDTO';

const router = express.Router();

router.get("", (req: express.Request, res: express.Response) => {
    res.status(200).json(FakeDatabase.Rooms);
});

router.post("", (req: express.Request, res: express.Response) => {
    let name = req.body.name;

    if (!name)
        res.status(400).json({ error: "Bad request" });
    else
    {
        let elem = new RoomDTO(FakeDatabase.Rooms.length+1, name, 0);
        FakeDatabase.Rooms.push(elem);
        res.status(201).json(elem);
    }
});

router.delete("/:roomId", (req: express.Request, res: express.Response) => {
    let id = Number(req.params.roomId);
    if(isNaN(id))
        res.status(400).json({ error: "Bad request" });
    else
    {
        let index = FakeDatabase.Rooms.findIndex(item => item.Id == id);
        if(index == -1)
            res.status(400).json({ error: "Room not found" });
        else
        {
            FakeDatabase.Rooms.splice(index, 1);
            res.status(200).json({ message: "elemet removed" });
        }
    }
});

router.put("/:roomId", (req: express.Request, res: express.Response) => {
    let id = Number(req.params.roomId);
    if(isNaN(id))
        res.status(400).json({ error: "Bad request" });
    else
    {
        let name = req.body.name;

        if (!name)
            res.status(400).json({ error: "Bad request" });

        let index = FakeDatabase.Rooms.findIndex(item => item.Id == id);
        if(index == -1)
            res.status(400).json({ error: "Room not found" });
        else
        {
            const elem = FakeDatabase.Rooms[index].Name = name;
            res.status(200).json(elem);
        }
    }
});

export { router as rooms };