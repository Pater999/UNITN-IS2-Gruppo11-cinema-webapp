import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { validateTokenAdmin, validateTokenUser } from "./Utilities/authentication";
import { RegisterDto } from "./models/DTO/RegisterDTO";
import Users from "./Database/schemas/users";
import Movies from "./Database/schemas/movies";
import { connUri, dbOptions, stage } from "./Database/databaseService";

const router = express.Router();

router.get("", validateTokenAdmin, async (req: express.Request, res: express.Response) => {
  let db = null;
  try {
    db = await mongoose.createConnection(connUri, dbOptions);
    const UserMod = db.model("Users", Users);
    const users = await UserMod.find().select("-__v -Password").exec();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Internal server error." });
  } finally {
    db && db.close();
  }
});

router.put("/:userId/change-role", validateTokenAdmin, async (req: express.Request, res: express.Response) => {
  let id = req.params.userId;
  if (!id) res.status(400).json({ error: "Bad request" });
  else {
    let role = req.body.role;

    if (!role || (role !== "admin" && role !== "User")) res.status(400).json({ error: "Bad request" });
    else {
      let db = null;
      try {
        db = await mongoose.createConnection(connUri, dbOptions);
        const UserMod = db.model("Users", Users);
        const elem = (await UserMod.findByIdAndUpdate(id, { Role: role }, { new: true, useFindAndModify: false }).select("-__v -Password").exec()) as any;
        if (!elem) throw new Error();

        res.status(200).json(elem);
      } catch (err) {
        res.status(404).json({ error: "User not found" });
      } finally {
        db && db.close();
      }
    }
  }
});

router.post("", async (req: express.Request, res: express.Response) => {
  const { name, surname, username, email, password } = req.body;

  if (!name || !surname || !username || !email || !password) {
    res.status(400).json({ error: "Some Fields are null or empty!" });
  } else {
    try {
      const hashedPass = await bcrypt.hash(password, stage.saltingRounds);
      const elem = new RegisterDto(name, surname, username, email, hashedPass);
      let db = null;
      try {
        db = await mongoose.createConnection(connUri, dbOptions);
        const UserMod = db.model("Users", Users);
        const { _id, Username, Role, Name, Surname, Email } = (await UserMod.create(elem)) as any;
        res.status(201).json({ id: _id, Username, Role, Name, Surname, Email });
      } catch (err) {
        res.status(409).json({ error: "Questo username è stato già utilizzato!" });
      } finally {
        db && db.close();
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error." });
    }
  }
});

router.get("/:userId/reservations", validateTokenUser, async (req: express.Request, res: express.Response) => {
  let userId = req.params.userId;
  const tokenUsername = res.locals.username;

  const query = [
    { $unwind: "$plans" },
    { $unwind: "$plans.reservations" },
    {
      $project: { _id: 0, reservationId: "$plans.reservations._id", date: "$plans.date", movieTitle: "$title", movieId: "$_id", userId: "$plans.reservations.userId", fareId: "$plans.reservations.fareId" },
    },
    {
      $lookup: {
        from: "fares",
        localField: "fareId",
        foreignField: "_id",
        as: "fares",
      },
    },
    {
      $project: {
        reservationId: 1,
        date: 1,
        movieTitle: 1,
        movieId: 1,
        fare: { $arrayElemAt: ["$fares", 0] },
      },
    },
    {
      $unset: ["fare.__v"],
    },
  ];

  if (!userId) {
    res.status(400).json({ error: "Bad request" });
    return;
  }

  try {
    query.unshift({ $match: { "plans.reservations.userId": new mongoose.Types.ObjectId(userId) } } as any);
  } catch {
    res.status(400).json({ error: "Bad request" });
    return;
  }

  let db = null;
  try {
    db = await mongoose.createConnection(connUri, dbOptions);

    const UserMod = db.model("Users", Users);
    const user = await UserMod.findOne({ Username: tokenUsername });
    if (!user) {
      res.status(500).json({ error: "Internal server error." });
      return;
    } else if (user._id != userId) {
      res.status(403).json({ error: "Non puoi visualizzare la lista biglietti di un altro utente" });
      return;
    }

    const MovieMod = db.model("Movies", Movies);
    let reservations = await MovieMod.aggregate(query);

    res.status(200).json(reservations);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error." });
  } finally {
    db && db.close();
  }
});

export { router as users };
