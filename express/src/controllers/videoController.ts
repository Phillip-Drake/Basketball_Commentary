import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    fs.readdir("uploads/", (err, files) => {
      let count = files ? files.length : 0;
      cb(null, count + 1 + ".mp4");
    });
  },
});

const upload = multer({ storage: storage });
export const uploadFile = upload.single("file");
