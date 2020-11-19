import express from 'express';
import { validateTokenAdmin } from './Utilities/authentication';
import mongoose from 'mongoose';
import { connUri, dbOptions } from './Database/databaseService';
import Rooms from "./Database/schemas/rooms";

const router = express.Router();

router.get('', async (req: express.Request, res: express.Response) => {

  let db = null;
  try {
    db = await mongoose.createConnection(connUri, dbOptions);
    const RoomMod = db.model("Rooms", Rooms);
    let rooms = await RoomMod.find().select("-__v").exec() as any;
    rooms = rooms.map(({ _id, name, rows }: { _id: string, name: string, rows: number[]}) => {
      return {
        _id,
        name,
        seatsNumber: rows.reduce((a, b) => a + b, 0),
      };
    })
    res.status(200).json(rooms);
  } catch (err) {
    res.status(500).json({ error: "Internal server error." });
  } finally {
    db && db.close();
  }
});

router.post('', validateTokenAdmin, async (req: express.Request, res: express.Response) => {
  let name = req.body.name;

  if (!name) res.status(400).json({ error: 'Bad request' });
  else {
    const elem = { name, rows: [] };
    let db = null;
    try {
      db = await mongoose.createConnection(connUri, dbOptions);
      const RoomMod = db.model("Rooms", Rooms);
      const room = (await RoomMod.create(elem)) as any;
      res.status(201).json({
        id: room._id,
        name: room.name,
        seats: 0,
      });
    } catch (err) {
      res.status(500).json({ error: "Internal server error." });
    } finally {
      db && db.close();
    }
  }
});

router.delete('/:roomId', validateTokenAdmin, async (req: express.Request, res: express.Response) => {
  let id = req.params.roomId;
  if (!id) res.status(400).json({ error: 'Bad request' });
  else {
    let db = null;
    try {
      db = await mongoose.createConnection(connUri, dbOptions);
      const RoomMod = db.model("Rooms", Rooms);
      //Check film if uses Room
      const room = await RoomMod.findByIdAndDelete(id);
      if (!room)
        throw new Error();

      res.status(200).json({ message: "Sala rimossa con successo!" });
    } catch (err) {
      res.status(404).json({ error: "Sala non trovata!" });
    } finally {
      db && db.close();
    }
  }
});

router.put('/:roomId', validateTokenAdmin, async (req: express.Request, res: express.Response) => {
  let id = req.params.roomId;
  if (!id) res.status(400).json({ error: 'Bad request' });
  else {
    let name = req.body.name;

    if (!name)
      res.status(400).json({ error: 'Bad request' });
    else {
      let db = null;
      try {
        db = await mongoose.createConnection(connUri, dbOptions);
        const RoomMod = db.model("Rooms", Rooms);
        const elem = (await RoomMod.findByIdAndUpdate(id, { name }, { new: true, useFindAndModify: false }) as any);
        if (!elem)
          throw new Error();

        res.status(200).json({ id: elem._id, name: elem.name });
      } catch (err) {
        res.status(404).json({ error: 'Room not found' });
      } finally {
        db && db.close();
      }
    }
  }
});

router.get('/:roomId/rows', async (req: express.Request, res: express.Response) => {
  const id = req.params.roomId;
  if (!id) res.status(400).json({ error: 'Bad request' });

  let db = null;
  try {
    db = await mongoose.createConnection(connUri, dbOptions);
    const RoomsMod = db.model("Rooms", Rooms);
    const rooms = await RoomsMod.findById(id) as any;
    res.status(200).json(rooms.rows);
  } catch (err) {
    res.status(500).json({ error: "Internal server error." });
  } finally {
    db && db.close();
  }
});

router.post('/:roomId/rows', validateTokenAdmin, async (req: express.Request, res: express.Response) => {
  const id = req.params.roomId;
  const seatsNumber = req.body.seatsNumber;

  if (!id && !seatsNumber && isNaN(seatsNumber)) res.status(400).json({ error: 'Bad request' });
  else {

    let db = null;
    try {
      db = await mongoose.createConnection(connUri, dbOptions);
      const RoomMod = db.model("Rooms", Rooms);
      const room = await RoomMod.findByIdAndUpdate(id, { $push: { rows: seatsNumber }, new: true, useFindAndModify: false }) as any;
      if (!room)
        throw new Error();

      res.status(201).json({
        id: room._id,
        seatsNumber: seatsNumber,
      });
    } catch (err) {
      res.status(500).json({ error: "Internal server error." });
    } finally {
      db && db.close();
    }
  }
});

export { router as rooms };
