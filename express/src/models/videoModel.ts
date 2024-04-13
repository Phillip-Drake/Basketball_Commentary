import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  url: {
    type: String,
  },
  date_made: {
    type: Date,
    default: Date.now,
  },
  finalScore: {
    type: Number,
    default: 0,
  },
  timeStamps: {
    type: Array,
  },
});

export const Video = mongoose.model("Video", videoSchema);
