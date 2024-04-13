import express, { Request, Response, NextFunction } from "express";
import * as uploadController from "../controllers/videoController";
import { watchDirectoryForChanges } from "../middleware/uploadToS3";

const videoRouter = express.Router();

videoRouter.post(
  "/video",
  uploadController.uploadFile,
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
      res.status(400).send("No file uploaded.");
    } else {
      try {
        await watchDirectoryForChanges();
        res.status(200).send("File uploaded successfully.");
      } catch (error) {
        res.status(500).send("File upload failed.");
      }
    }
  }
);

// videoRouter.post("/", uploadFileToAWS);

export default videoRouter;
