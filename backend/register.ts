import express from "express";
import { FakeDatabase } from "./Database/fakeDatabase";
import { RegisterDto } from "./models/DTO/RegisterDTO";

const router = express.Router();

router.post("", (req: express.Request, res: express.Response) => {
  let name = req.body.name;
  let surname = req.body.surname;
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;

  if (!name || !surname || !username || !email || !password) {
    res.status(400).json({ error: "Some Fields are null or empty!" });
  } else if (FakeDatabase.Users.includes( (x:any) => x.Username === username)) {
    res.status(409).json({ error: "Username already taken!" });
  } else {
    let elem = new RegisterDto(
      FakeDatabase.Users.length + 1,
      name,
      surname,
      username,
      email,
      password
    );
    FakeDatabase.Users.push(elem);
    res.status(200).json(elem);
  }
});

export { router as register };
