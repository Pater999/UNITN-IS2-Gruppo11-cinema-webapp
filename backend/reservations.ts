import express from 'express';
import mongoose from 'mongoose';
import { validateTokenAdmin, validateTokenUser } from './Utilities/authentication';
import { connUri, dbOptions } from './Database/databaseService';
import Movies from './Database/schemas/movies';
import Rooms from './Database/schemas/rooms';

const router = express.Router();

router.get('', validateTokenAdmin, async (req: express.Request, res: express.Response) => {
  let parsedStartDate,
    parsedEndDate = null;
  const { startDate, endDate, movieId } = req.query as { startDate: string; endDate: string; movieId: string };

  const query = [
    { $unwind: '$plans' },
    { $unwind: '$plans.reservations' },
    {
      $project: { _id: 0, reservationId: '$plans.reservations._id', date: '$plans.date', movieTitle: '$title', movieId: '$_id', userId: '$plans.reservations.userId', fareId: '$plans.reservations.fareId' }
    },
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'users'
      }
    },
    {
      $lookup: {
        from: 'fares',
        localField: 'fareId',
        foreignField: '_id',
        as: 'fares'
      }
    },
    {
      $project: {
        reservationId: 1,
        date: 1,
        movieTitle: 1,
        movieId: 1,
        user: { $arrayElemAt: ['$users', 0] },
        fare: { $arrayElemAt: ['$fares', 0] }
      }
    },
    {
      $unset: ['user.Password', 'user.__v', 'fare.__v']
    }
  ];

  if (startDate) {
    parsedStartDate = Date.parse(startDate);
    if (isNaN(parsedStartDate)) {
      res.status(400).json({ error: 'Bad request' });
    }
  }

  if (endDate) {
    parsedEndDate = Date.parse(endDate);
    if (isNaN(parsedEndDate)) {
      res.status(400).json({ error: 'Bad request' });
    }
  }

  if (movieId) {
    query.unshift({ $match: { _id: new mongoose.Types.ObjectId(movieId) } } as any);
  }

  if (parsedEndDate || parsedStartDate) {
    var now = new Date();
    query.push({
      $match: {
        date: {
          $gte: parsedStartDate ? new Date(parsedStartDate) : new Date(now.setFullYear(now.getFullYear() - 500)),
          $lte: parsedEndDate ? new Date(parsedEndDate) : new Date(now.setFullYear(now.getFullYear() + 500))
        }
      }
    } as any);
  }

  let db = null;
  try {
    db = await mongoose.createConnection(connUri, dbOptions);
    const MovieMod = db.model('Movies', Movies);
    db.model('Rooms', Rooms);
    let reservations = await MovieMod.aggregate(query);

    res.status(200).json(reservations);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error.' });
  } finally {
    db && db.close();
  }
});

export { router as reservations };
