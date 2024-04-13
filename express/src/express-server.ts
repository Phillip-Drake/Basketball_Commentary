import express from "express";
import videoRouter from "./routes/videoRoutes";
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/upload", videoRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
