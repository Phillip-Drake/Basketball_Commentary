import { link } from "fs";
import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  date_made: {
    type: Date,
    default: Date.now,
  },
  finalScore: {
    type: Number,
    default: 0,
  },
  goalTimes: {
    type: Array,
  },
  rimCoordinates: {
    type: Array,
  },
});

export const Video = mongoose.model("Video", videoSchema);
