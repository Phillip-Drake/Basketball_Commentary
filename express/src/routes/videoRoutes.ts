import express, { Request, Response, NextFunction } from "express";
import * as uploadController from "../controllers/videoController";
import { watchDirectoryForChanges } from "../middleware/uploadToS3";
import { Video } from "../models/videoModel";

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

// Get all videos from the database
videoRouter.get("/video", async (req: Request, res: Response) => {
  try {
    console.log("Getting videos");
    const videos = await Video.find({});
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: "Error getting videos", error });
  }
});

export default videoRouter;
