import { Router } from "express";
import User from "../models/userModels";

const userRouter = Router();

userRouter.get("/", (req, res) => {
  User.find({}, (err: any, found: any) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error!");
    }
    res.send(found);
  }).catch((err) => console.log("Error occured, " + err));
});

userRouter.post("/", (req, res) => {
  const { name, password } = req.body;
  console.log(req.body);
  console.log(name, password);
  const newUser = new User({ name, password });
  if (!newUser) {
    res.send("Could not create user.").status(400);
  }
  newUser.save();
});

export default userRouter;
