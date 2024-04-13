import { Router } from "express"
import User from "../models/userModels"

const userRouter = Router();

userRouter.get('/', (req, res) => {
    User.find({}, (err: any, found: any) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error!");
        }
        res.send(found);
    }).catch(err => console.log("Error occured, " + err));
});

userRouter.post('/', (req, res) => {
    const { name, email } = req.body;
    const newUser = new User({ name, email });
    if (!newUser){
        res.send("Could not create user.").status(400);
    }
newUser.save();
});

export default userRouter;