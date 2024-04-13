import express, { Request, Response, NextFunction } from "express";
import * as uploadController from "../controllers/videoController";
import { uploadToAWS } from "../middleware/uploadToS3";

const videoRouter = express.Router();

videoRouter.post(
  "/video",
  uploadController.uploadFile,
  (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send("File uploaded successfully");
  }
);

videoRouter.post("/", uploadToAWS);

export default videoRouter;
