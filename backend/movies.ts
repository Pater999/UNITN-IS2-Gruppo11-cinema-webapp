import express from 'express';
import { FakeDatabase } from './Database/fakeDatabase';
import { MovieDTO } from './models/DTO/MovieDTO';
import Planning from './models/DTO/Planning';
import { PlanningDTO } from './models/DTO/PlanningDTO';
import { isValidURL } from './Utilities/isValidURL';
import { validateTokenAdmin } from './Utilities/authentication';

const router = express.Router();

router.get('', (req: express.Request, res: express.Response) => {
  const date = req.query.date;

  if (date) {
    const filtroData = new Date(date as string);
    const moviesFiltered = FakeDatabase.Movies.filter(item => item.Plans.find((data: PlanningDTO) => new Date(data.Date).setHours(0, 0, 0, 0) === filtroData.setHours(0, 0, 0, 0)));
    res.status(200).json(moviesFiltered.map(({ Id, Title, Desc, ImageUrl, Plans }) => { return { Id, Title, Desc, ImageUrl, Plans: Plans.filter(plan => new Date(plan.Date).setHours(0, 0, 0, 0) === filtroData.setHours(0, 0, 0, 0)) } }));
  }
  else
    res.status(200).json(FakeDatabase.Movies);
});

router.post('', validateTokenAdmin, (req: express.Request, res: express.Response) => {
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

router.post('/:movieId/plannings', validateTokenAdmin, (req: express.Request, res: express.Response) => {
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

router.delete('/:movieId', validateTokenAdmin, (req: express.Request, res: express.Response) => {
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
