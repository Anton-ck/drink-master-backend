import multer from "multer";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

import HttpError from "../helpers/HttpError.js";

dotenv.config();

const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

const avatarImgParams = {
  dimensions: {
    width: 100,
    height: 100,
  },
  maxFileSize: 100000,
  acceptableFileTypes: ["jpg", "jpeg", "png"],
};

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    const imgName = `${req.user._id}_user`;

    return {
      folder: "avatars",
      allowed_formats: avatarImgParams.acceptableFileTypes,
      public_id: imgName,
      transformation: [
        {
          height: avatarImgParams.dimensions.height,
          width: avatarImgParams.dimensions.width,
          crop: "fill",
        },
      ],
      bytes: avatarImgParams.maxFileSize,
    };
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext && ext !== ".jpeg") {
      cb(HttpError(400, "Wrong extension type! Extensions should be *.png, *.jpg, *.jpeg"), false);
    } else {
      cb(null, true);
    }
  },
});

export default upload;
