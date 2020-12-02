import express from 'express';
import { PlanningDTO } from './models/DTO/PlanningDTO';
import { isValidURL } from './Utilities/isValidURL';
import mongoose from 'mongoose';
import { validateTokenAdmin, validateTokenUser } from './Utilities/authentication';
import { connUri, dbOptions } from './Database/databaseService';
import Movies from './Database/schemas/movies';
import Rooms from './Database/schemas/rooms';
import Users from './Database/schemas/users';
import Fares from './Database/schemas/fares';

const router = express.Router();

router.get('', async (req: express.Request, res: express.Response) => {
  const date = req.query.date;
  let db = null;
  try {
    db = await mongoose.createConnection(connUri, dbOptions);
    const MovieMod = db.model('Movies', Movies);
    db.model('Rooms', Rooms);
    let movies = (await MovieMod.find().populate('plans.room', '-__v -rows').select('-__v -plans.reservations').exec()) as any;

    if (date) {
      const filtroData = new Date(date as string);
      const moviesFiltered = movies.filter((item: any) => item.plans.find((plan: PlanningDTO) => new Date(plan.date).setHours(0, 0, 0, 0) === filtroData.setHours(0, 0, 0, 0)));
      res.status(200).json(
        moviesFiltered.map(({ _id, title, desc, imageUrl, plans }: { _id: number; title: string; desc: string; imageUrl: string; plans: PlanningDTO[] }) => {
          return {
            _id,
            title,
            desc,
            imageUrl,
            plans: plans.filter((plan: PlanningDTO) => new Date(plan.date).setHours(0, 0, 0, 0) === filtroData.setHours(0, 0, 0, 0))
          };
        })
      );
    } else res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error.' });
  } finally {
    db && db.close();
  }
});

router.post('', validateTokenAdmin, async (req: express.Request, res: express.Response) => {
  let title = req.body.title;
  let desc = req.body.desc;
  let imageUrl = req.body.imageUrl;

  if (!title || !desc || !imageUrl || !isValidURL(imageUrl)) res.status(400).json({ error: 'Some Fields are null or empty!' });
  else {
    const elem = { title, desc, imageUrl, plans: [] };
    let db = null;
    try {
      db = await mongoose.createConnection(connUri, dbOptions);
      const MovieMod = db.model('Movies', Movies);
      const movie = (await MovieMod.create(elem)) as any;
      res.status(201).json({
        _id: movie._id,
        title: movie.title,
        desc: movie.desc,
        imageUrl: movie.imageUrl
      });
    } catch (err) {
      res.status(500).json({ error: 'Internal server error.' });
    } finally {
      db && db.close();
    }
  }
});

router.post('/:movieId/plannings', validateTokenAdmin, async (req: express.Request, res: express.Response) => {
  let id = req.params.movieId;
  let plannings = req.body.plannings;

  if (!id || !plannings) res.status(400).json({ error: 'Some Fields are null or empty!' });
  else {
    let db = null;
    try {
      db = await mongoose.createConnection(connUri, dbOptions);
      const MovieMod = db.model('Movies', Movies);
      const movie = (await MovieMod.findByIdAndUpdate(id, { plans: plannings }, { new: true, useFindAndModify: false })) as any;
      res.status(201).json({
        plans: movie.plans
      });
    } catch (err) {
      res.status(500).json({ error: 'Internal server error.' });
    } finally {
      db && db.close();
    }
  }
});

router.delete('/:movieId', validateTokenAdmin, async (req: express.Request, res: express.Response) => {
  let id = req.params.movieId;
  if (!id) res.status(400).json({ error: 'Bad request' });
  else {
    let db = null;
    try {
      db = await mongoose.createConnection(connUri, dbOptions);
      const MovieMod = db.model('Movies', Movies);
      const movie = await MovieMod.findByIdAndDelete(id);
      if (!movie) throw new Error();

      res.status(200).json({ message: 'element removed' });
    } catch (err) {
      res.status(404).json({ error: 'Film non trovato!' });
    } finally {
      db && db.close();
    }
  }
});

router.post('/:movieId/plannings/:planId/reservations', validateTokenUser, async (req: express.Request, res: express.Response) => {
  const { movieId, planId } = req.params;
  const tokenUsername = res.locals.username;
  let reservation: { userId: string; fareId: string } = req.body;

  if (!movieId || !planId || !reservation || !reservation.userId || !reservation.fareId) res.status(400).json({ error: 'Some Fields are null or empty!' });
  else {
    let db = null;
    try {
      db = await mongoose.createConnection(connUri, dbOptions);
      const MovieMod = db.model('Movies', Movies);
      const UserMod = db.model('Users', Users);
      db.model('Fares', Fares);
      const user = await UserMod.findOne({ Username: tokenUsername });
      if (!user) res.status(404).json({ error: 'Username not found' });
      else if (user._id != reservation.userId) res.status(403).json({ error: 'Non puoi prenotare un biglietto a nome di un altro utente' });
      const movie = (await MovieMod.findOneAndUpdate({ _id: movieId, 'plans._id': planId }, { $push: { 'plans.$.reservations': { userId: reservation.userId, fareId: reservation.fareId } } }, { new: true, useFindAndModify: false })) as any;

      const ret = (await MovieMod.findOne({ _id: movieId, 'plans._id': planId }, { 'plans.$': 1 }).populate('plans.reservations.user', '-__v -Password').populate('plans.reservations.fare', '-__v')) as any;
      res.status(201).json(ret.plans[0].reservations.slice(-1));
    } catch (err) {
      res.status(500).json({ error: 'Internal server error.' });
    } finally {
      db && db.close();
    }
  }
});

export { router as movies };
