import express, { Request, Response, NextFunction } from "express";
import * as uploadController from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.post(
  "/upload",
  uploadController.uploadFile,
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
      const err = new Error("No file uploaded");
      res.status(400).send({ error: err.message });
      return;
    }
    console.log(req.file);
    res.send("File uploaded successfully");
  }
);

export default videoRouter;
