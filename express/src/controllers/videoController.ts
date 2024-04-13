import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const player1Name = req.body.player1Name;
    const player2Name = req.body.player2Name;
    const filename = `${Date.now()}_${player1Name}_vs_${player2Name}.mp4`;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });
export const uploadFile = upload.single("file");
