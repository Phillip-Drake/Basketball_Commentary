import multer from "multer";
import multerS3 from "multer-s3";
import { Video } from "../models/videoModel";
import { S3Client } from "@aws-sdk/client-s3";
require("dotenv").config();

const region = process.env.REGION;
const accessKey = process.env.ACCESS_KEY as string;
const secretKey = process.env.SECRET_KEY as string;
const bucketName = process.env.BUCKET_NAME as string;
console.log(region, accessKey, secretKey, bucketName);

const s3Config = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
  },
  region: region,
});

const uploadToAWS = multer({
  storage: multerS3({
    s3: s3Config,
    bucket: bucketName,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      let title: string = Date.now() + file.originalname;
      let key = title;
      Video.create({ title: title, key: key });
      cb(null, Date.now() + file.originalname);
    },
  }),
}).array("file", 1);

export { uploadToAWS };
