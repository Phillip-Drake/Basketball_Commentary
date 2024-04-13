import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    timestamps: {
        type: [],
        required: true
    },
    link: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        required: true
    }
});

const Video = mongoose.model('Video', videoSchema);

export default Video;