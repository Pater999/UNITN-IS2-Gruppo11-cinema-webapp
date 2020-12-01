import express from "express";
import mongoose from "mongoose";
import Ads from "./Database/schemas/ads";
import { validateTokenAdmin } from "./Utilities/authentication";
import { connUri, dbOptions } from "./Database/databaseService";

const router = express.Router();

router.get("", async (req: express.Request, res: express.Response) => {
  let db = null;
  try {
    db = await mongoose.createConnection(connUri, dbOptions);
    const AdMod = db.model("Ads", Ads);
    const ads = await AdMod.find().select("-__v").exec();
    res.status(200).json(ads);
  } catch (err) {
    res.status(500).json({ error: "Internal server error." });
  } finally {
    db && db.close();
  }
});

router.post("", validateTokenAdmin, async (req: express.Request, res: express.Response) => {
  const title= req.body.title;
  const ad = req.body.ad;
  const date = req.body.date;

  if (!title || !ad || !date) res.status(400).json({ error: "Some Fields are null or empty!" });
  else {
    const elem = { title, ad, date };
    let db = null;
    try {
      db = await mongoose.createConnection(connUri, dbOptions);
      const AdMod = db.model("Ads", Ads);
      const ads = (await AdMod.create(elem)) as any;
      res.status(201).json({
        id: ads._id,
        title: ads.title,
        ad: ads.ad,
        date: ads.date,
      });
    } catch (err) {
      res.status(500).json({ error: "Internal server error." });
    } finally {
      db && db.close();
    }
  }
});

router.delete(
  "/:adId",
  validateTokenAdmin,
  async (req: express.Request, res: express.Response) => {
    const id = req.params.adId;
    if (!id) res.status(400).json({ error: "Some Fields are null or empty!" });
    else {
      let db = null;
      try {   
        db = await mongoose.createConnection(connUri, dbOptions);
        const AdMod = db.model("Ads", Ads);

        const ad = await AdMod.findByIdAndDelete(id);
        if (!ad) throw new Error();

        res.status(200).json({ message: "Annuncio rimosso con successo!" });
      } catch (err) {
        res.status(404).json({ error: "Annuncio non trovato!" });
      } finally {
        db && db.close();
      }
    }
  }
);

export { router as ads };
