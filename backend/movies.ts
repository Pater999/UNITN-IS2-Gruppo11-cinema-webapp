import express from "express";
import { PlanningDTO } from "./models/DTO/PlanningDTO";
import { isValidURL } from "./Utilities/isValidURL";
import mongoose from "mongoose";
import { validateTokenAdmin } from "./Utilities/authentication";
import { connUri, dbOptions } from "./Database/databaseService";
import Movies from "./Database/schemas/movies";
import Rooms from "./Database/schemas/rooms";
import { RoomDTO } from "./models/DTO/RoomDTO";

const router = express.Router();

router.get("", async (req: express.Request, res: express.Response) => {
  const date = req.query.date;
  let db = null;
  try {
    db = await mongoose.createConnection(connUri, dbOptions);
    const MovieMod = db.model("Movies", Movies);
    let movies = (await MovieMod.find().select("-__v").exec()) as any;
    const RoomMod = db.model("Rooms", Rooms);
    let rooms = await RoomMod.find().select("-__v -rows").exec() as any[];

    movies = movies.map(({ _id, title, desc, imageUrl, plans }: { _id: string, title: string, desc: string, imageUrl: string, plans: PlanningDTO[] }) => {
      return {
        _id,
        title,
        desc,
        imageUrl,
        plans: plans.map(({ _id, date, roomId }: PlanningDTO) => {
          return {
            _id,
            date,
            room: rooms.find(item => item._id == roomId)
          }
        }),
      };
    })

    if (date) {
      const filtroData = new Date(date as string);
      const moviesFiltered = movies.filter((item: any) => item.plans.find((plan: PlanningDTO) => new Date(plan.date).setHours(0, 0, 0, 0) === filtroData.setHours(0, 0, 0, 0)));
      res.status(200).json(
        moviesFiltered.map(({ _id, title, desc, imageUrl, plans }: { _id: number, title: string, desc: string, imageUrl: string, plans: PlanningDTO[] }) => {
          return {
            _id,
            title,
            desc,
            imageUrl,
            plans: plans.filter((plan: PlanningDTO) => new Date(plan.date).setHours(0, 0, 0, 0) === filtroData.setHours(0, 0, 0, 0)),
          };
        })
      );
    }
    else
      res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ error: "Internal server error." });
  } finally {
    db && db.close();
  }
});

router.post("", validateTokenAdmin, async (req: express.Request, res: express.Response) => {
  let title = req.body.title;
  let desc = req.body.desc;
  let imageUrl = req.body.imageUrl;

  if (!title || !desc || !imageUrl || !isValidURL(imageUrl)) res.status(400).json({ error: "Some Fields are null or empty!" });
  else {
    const elem = { title, desc, imageUrl, plans: [] };
    let db = null;
    try {
      db = await mongoose.createConnection(connUri, dbOptions);
      const MovieMod = db.model("Movies", Movies);
      const movie = (await MovieMod.create(elem)) as any;
      res.status(201).json({
        _id: movie._id,
        title: movie.title,
        desc: movie.desc,
        imageUrl: movie.imageUrl,
      });
    } catch (err) {
      res.status(500).json({ error: "Internal server error." });
    } finally {
      db && db.close();
    }
  }
});

router.post("/:movieId/plannings", validateTokenAdmin, async (req: express.Request, res: express.Response) => {
  let id = req.params.movieId;
  let plannings = req.body.plannings;

  if (!id || !plannings) res.status(400).json({ error: "Some Fields are null or empty!" });
  else {
    let db = null;
    try {
      db = await mongoose.createConnection(connUri, dbOptions);
      const MovieMod = db.model("Movies", Movies);
      const movie = (await MovieMod.findByIdAndUpdate(id, { plans: plannings }, { new: true, useFindAndModify: false })) as any;
      res.status(201).json({
        plans: movie.plans,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error." });
    } finally {
      db && db.close();
    }
  }
});

router.delete("/:movieId", validateTokenAdmin, async (req: express.Request, res: express.Response) => {
  let id = req.params.movieId;
  if (!id) res.status(400).json({ error: "Bad request" });
  else {

    let db = null;
    try {
      db = await mongoose.createConnection(connUri, dbOptions);
      const MovieMod = db.model("Movies", Movies);
      const movie = await MovieMod.findByIdAndDelete(id);
      if (!movie)
        throw new Error();

      res.status(200).json({ message: "element removed" });
    } catch (err) {
      res.status(404).json({ error: "Film non trovato!" });
    } finally {
      db && db.close();
    }
  }
});

export { router as movies };
