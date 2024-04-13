import express, { Request, Response, NextFunction } from "express";
import * as uploadController from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

videoRouter.post(
  "/",
  uploadController.uploadFile,
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
      const err = new Error("No file uploaded");
      res.status(400).send({ error: err.message });
      return;
    }
    console.log(req.file);
    res.send("File uploaded successfully").status(200);
  }
);

export default videoRouter;
