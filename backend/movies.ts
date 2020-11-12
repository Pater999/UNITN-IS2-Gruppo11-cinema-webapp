import express from 'express';
import { FakeDatabase } from './Database/fakeDatabase';
import { MovieDTO } from './models/DTO/MovieDTO';
import Planning from './models/DTO/Planning';
import { PlanningDTO } from './models/DTO/PlanningDTO';
import { isValidURL } from './Utilities/isValidURL';

const router = express.Router();

router.get('', (req: express.Request, res: express.Response) => {
  res.status(200).json(FakeDatabase.Movies);
});

router.post('', (req: express.Request, res: express.Response) => {
  let title = req.body.title;
  let desc = req.body.desc;
  let imageUrl = req.body.imageUrl;

  if (!title || !desc || !imageUrl || !isValidURL(imageUrl)) res.status(400).json({ error: 'Some Fields are null or empty!' });
  else {
    let elem = new MovieDTO(FakeDatabase.Movies.length + 1, imageUrl, title, desc, []);
    FakeDatabase.Movies.push(elem);
    res.status(201).json(elem);
  }
});

router.post('/:movieId/plannings', (req: express.Request, res: express.Response) => {
  let id = Number(req.params.movieId);
  let plannings = req.body.planning;

  if (isNaN(id) || !plannings) res.status(400).json({ error: 'Some Fields are null or empty!' });
  else {
    let index = FakeDatabase.Movies.findIndex((item) => item.Id == id);
    if (index != -1) {
      (plannings as Planning[]).forEach((plan) => {
        const roomIndex = FakeDatabase.Rooms.findIndex((room) => room.Id == plan.RoomId);
        if (roomIndex != -1) FakeDatabase.Movies[index].Plans.push(new PlanningDTO(plan.Date, FakeDatabase.Rooms[roomIndex]));
      });
    }

    res.status(201).json(FakeDatabase.Movies[index]);
  }
});

router.delete('/:movieId', (req: express.Request, res: express.Response) => {
  let id = Number(req.params.movieId);
  if (isNaN(id)) res.status(400).json({ error: 'Bad request' });
  else {
    let index = FakeDatabase.Movies.findIndex((item) => item.Id == id);
    if (index == -1) res.status(400).json({ error: 'Movie not found' });
    else {
      FakeDatabase.Movies.splice(index, 1);
      res.status(200).json({ message: 'element removed' });
    }
  }
});

export { router as movies };
