import express from "express";
import videoRouter from "./routes/videoRoutes";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/upload", videoRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
