import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";
import { promisify } from "util";
import { Video } from "../models/videoModel";
require("dotenv").config();

const readdir = promisify(fs.readdir);

const region = process.env.REGION as string;
const accessKey = process.env.ACCESS_KEY as string;
const secretKey = process.env.SECRET_KEY as string;
const bucketName = process.env.BUCKET_NAME as string;

const s3Config = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
  },
  region: region,
});

function getAWSS3FileLink(
  bucketName: string,
  key: string,
  region: string
): string {
  return `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;
}

async function uploadFileToAWS(filePath: string) {
  try {
    // Read the local file
    const fileContent = fs.readFileSync(filePath);

    // Upload the file to S3
    const uploadParams = {
      Bucket: bucketName,
      Key: path.basename(filePath),
      Body: fileContent,
    };
    await s3Config.send(new PutObjectCommand(uploadParams));

    // Delete the local file
    fs.unlinkSync(filePath);

    // Get the URL of the uploaded file
    const fileURL = getAWSS3FileLink(
      bucketName,
      path.basename(filePath),
      region
    );
    Video.create({ title: path.basename(filePath), link: fileURL });

    console.log(`Uploaded ${filePath} to AWS S3 successfully. URL: ${fileURL}`);
    return;
  } catch (error) {
    console.error(`Error uploading ${filePath} to AWS S3:`, error);
    return;
  }
}

async function watchDirectoryForChanges() {
  // Current working directory
  const cwd = process.cwd();

  // Full path to the uploads directory
  const dirPath = path.join(cwd, "uploads/");

  // Wait for files to be added to the directory
  console.log("Waiting for files to be added to:", dirPath);
  while (true) {
    try {
      const files = await readdir(dirPath);
      if (files.length > 0) {
        console.log("Files detected:", files);
        for (const file of files) {
          const filePath = path.join(dirPath, file);
          await uploadFileToAWS(filePath);
          return;
        }
      }
    } catch (error) {
      console.error("Error reading directory:", error);
    }
    // Wait for a while before checking again
    await new Promise((resolve) => setTimeout(resolve, 5000)); // Check every 5 seconds
  }
}

export { watchDirectoryForChanges };
