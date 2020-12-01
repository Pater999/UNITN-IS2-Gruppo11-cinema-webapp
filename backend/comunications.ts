import express from "express";
import mongoose from "mongoose";
import Comunications from "./Database/schemas/comunications";
import { validateTokenAdmin } from "./Utilities/authentication";
import { connUri, dbOptions } from "./Database/databaseService";

const router = express.Router();

router.get("", async (req: express.Request, res: express.Response) => {
  let db = null;
  try {
    db = await mongoose.createConnection(connUri, dbOptions);
    const ComunicationMod = db.model("Comunications", Comunications);
    const comunications = await ComunicationMod.find().select("-__v").exec();
    res.status(200).json(comunications);
  } catch (err) {
    res.status(500).json({ error: "Internal server error." });
  } finally {
    db && db.close();
  }
});

router.post("", validateTokenAdmin, async (req: express.Request, res: express.Response) => {
  const title= req.body.title;
  const desc = req.body.desc;
  const date = req.body.date;

  if (!title || !desc || !date) res.status(400).json({ error: "Some Fields are null or empty!" });
  else {
    const elem = { title, desc, date };
    let db = null;
    try {
      db = await mongoose.createConnection(connUri, dbOptions);
      const ComunicationMod = db.model("Comunications", Comunications);
      const comunications = (await ComunicationMod.create(elem)) as any;
      res.status(201).json({
        id: comunications._id,
        title: comunications.title,
        desc: comunications.desc,
        date: comunications.date,
      });
    } catch (err) {
      res.status(500).json({ error: "Internal server error." });
    } finally {
      db && db.close();
    }
  }
});

router.delete(
  "/:comunicationId",
  validateTokenAdmin,
  async (req: express.Request, res: express.Response) => {
    const id = req.params.comunicationId;
    if (!id) res.status(400).json({ error: "Some Fields are null or empty!" });
    else {
      let db = null;
      try {   
        db = await mongoose.createConnection(connUri, dbOptions);
        const ComunicationMod = db.model("Comunications", Comunications);

        const comunication = await ComunicationMod.findByIdAndDelete(id);
        if (!comunication) throw new Error();

        res.status(200).json({ message: "Annuncio rimosso con successo!" });
      } catch (err) {
        res.status(404).json({ error: "Annuncio non trovato!" });
      } finally {
        db && db.close();
      }
    }
  }
);

export { router as comunications };
