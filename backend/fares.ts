import express from "express";
import mongoose from "mongoose";
import Fares from "./Database/schemas/fares";
import { validateTokenAdmin } from "./Utilities/authentication";
import { connUri, dbOptions } from "./Database/databaseService";

const router = express.Router();

router.get("", async (req: express.Request, res: express.Response) => {
  let db = null;
  try {
    db = await mongoose.createConnection(connUri, dbOptions);
    const FareMod = db.model("Fares", Fares);
    const fares = await FareMod.find().select("-__v").exec();
    res.status(200).json(fares);
  } catch (err) {
    res.status(500).json({ error: "Internal server error." });
  } finally {
    db && db.close();
  }
});

router.post("", validateTokenAdmin, async (req: express.Request, res: express.Response) => {
  const name = req.body.name;
  const price = Number(req.body.price);
  const desc = req.body.desc;

  if (!name || isNaN(price) || !desc) res.status(400).json({ error: "Some Fields are null or empty!" });
  else {
    const elem = { name, price, desc };
    let db = null;
    try {
      db = await mongoose.createConnection(connUri, dbOptions);
      const FareMod = db.model("Fares", Fares);
      const fare = (await FareMod.create(elem)) as any;
      res.status(201).json({
        id: fare._id,
        name: fare.name,
        price: fare.price,
        desc: fare.desc,
      });
    } catch (err) {
      res.status(500).json({ error: "Internal server error." });
    } finally {
      db && db.close();
    }
  }
});

router.delete("/:fareId", validateTokenAdmin, async (req: express.Request, res: express.Response) => {
  const id = req.params.fareId;
  if (!id) res.status(400).json({ error: "Some Fields are null or empty!" });
  else {
    let db = null;
    try {
      db = await mongoose.createConnection(connUri, dbOptions);
      const FareMod = db.model("Fares", Fares);
      const count = await FareMod.countDocuments();

      if (count <= 1) {
        res.status(409).json({ error: "Deve esserci almeno una Tariffa!" });
      } else {
        const fare = await FareMod.findByIdAndDelete(id);

        res.status(200).json({ message: "Tariffa rimossa con successo!" });
      }
    } catch (err) {
      res.status(404).json({ error: "Tariffa non trovata!" });
    } finally {
      db && db.close();
    }
  }
});

export { router as fares };
