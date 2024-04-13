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

    const player1Name: string = req.body.player1Name;
    const player2Name: string = req.body.player2Name;

    if (!player1Name || !player2Name) {
      const err = new Error("Player names are required");
      res.status(400).send({ error: err.message });
      return;
    }

    console.log(req.file);
    console.log(`Player 1: ${player1Name}`);
    console.log(`Player 2: ${player2Name}`);

    res.send("File and player names received successfully").status(200);
  }
);

export default videoRouter;
