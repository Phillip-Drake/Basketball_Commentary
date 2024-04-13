import express, { Request, Response, NextFunction } from "express";
import * as uploadController from "../controllers/videoController";
import { uploadToAWS } from "../middleware/uploadToS3";

const videoRouter = express.Router();

videoRouter.post("/", uploadToAWS);

export default videoRouter;
