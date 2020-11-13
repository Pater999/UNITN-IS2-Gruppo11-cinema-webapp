import express from 'express';
import { FakeDatabase } from './Database/fakeDatabase';
import { RoomDTO } from './models/DTO/RoomDTO';
import { Room } from './models/DTO/RoomDTO';
import { RoomRowDTO } from './models/DTO/RoomRowDTO';
import { validateTokenAdmin } from './Utilities/authentication';

const router = express.Router();

router.get('', (req: express.Request, res: express.Response) => {
  res.status(200).json(
    FakeDatabase.Rooms.map(({ Rows, Id, Name }) => {
      return { Id: Id, Name: Name, Seats: Rows.reduce((a, { SeatsNumber }) => a + SeatsNumber, 0) };
    }) as RoomDTO[]
  );
});

router.post('', validateTokenAdmin, (req: express.Request, res: express.Response) => {
  let name = req.body.name;

  if (!name) res.status(400).json({ error: 'Bad request' });
  else {
    let elem = new Room(FakeDatabase.Rooms.length + 1, name, []);
    FakeDatabase.Rooms.push(elem);
    res.status(201).json(elem);
  }
});

router.delete('/:roomId', validateTokenAdmin, (req: express.Request, res: express.Response) => {
  let id = Number(req.params.roomId);
  if (isNaN(id)) res.status(400).json({ error: 'Bad request' });
  else {
    let index = FakeDatabase.Rooms.findIndex((item) => item.Id == id);
    if (index == -1) res.status(400).json({ error: 'Room not found' });
    else {
      FakeDatabase.Rooms.splice(index, 1);
      res.status(200).json({ message: 'element removed' });
    }
  }
});

router.put('/:roomId', validateTokenAdmin, (req: express.Request, res: express.Response) => {
  let id = Number(req.params.roomId);
  if (isNaN(id)) res.status(400).json({ error: 'Bad request' });
  else {
    let name = req.body.name;

    if (!name) res.status(400).json({ error: 'Bad request' });

    let index = FakeDatabase.Rooms.findIndex((item) => item.Id == id);
    if (index == -1) res.status(400).json({ error: 'Room not found' });
    else {
      const elem = (FakeDatabase.Rooms[index].Name = name);
      res.status(200).json(elem);
    }
  }
});

router.get('/:roomId/rows', (req: express.Request, res: express.Response) => {
  const id = Number(req.params.roomId);
  if (isNaN(id)) res.status(400).json({ error: 'Bad request' });

  const index = FakeDatabase.Rooms.findIndex((item) => item.Id == id);
  if (index == -1) res.status(400).json({ error: 'Room not found' });
  else {
    const elem = FakeDatabase.Rooms[index].Rows;
    res.status(200).json(elem);
  }
});

router.post('/:roomId/rows', validateTokenAdmin, (req: express.Request, res: express.Response) => {
  const id = Number(req.params.roomId);
  const seatsNumber = req.body.seatsNumber;

  if (isNaN(id) && !seatsNumber && isNaN(seatsNumber)) res.status(400).json({ error: 'Bad request' });
  else {
    const index = FakeDatabase.Rooms.findIndex((item) => item.Id == id);
    if (index == -1) res.status(400).json({ error: 'Room not found' });
    else {
      let elem = new RoomRowDTO(FakeDatabase.Rooms[index].Rows.length + 1, seatsNumber);
      FakeDatabase.Rooms[index].Rows.push(elem);
      res.status(201).json(elem);
    }
  }
});

export { router as rooms };
