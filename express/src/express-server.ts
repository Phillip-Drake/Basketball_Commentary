import express from "express";
import videoRouter from "./routes/videoRoutes";
import dotenv from "dotenv";
import connectToDB from "./db";
import userRouter from "./routes/userRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/upload", videoRouter);
app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

connectToDB();
