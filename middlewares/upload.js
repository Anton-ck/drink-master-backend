import multer from "multer";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

import HttpError from "../helpers/HttpError.js";

dotenv.config();

const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

const avatarSize = 100;
const recipeSize = 400;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

const ImgParams = {
  maxFileSize: 100000,
  acceptableFileTypes: ["jpg", "jpeg", "png"],
};

const transformationAvatar = {
  transformation: [
    {
      height: avatarSize,
      width: avatarSize,
      crop: "fill",
    },
  ],
};

const transformationRecipe = {
  transformation: [
    {
      height: recipeSize,
      width: recipeSize,
      crop: "fill",
    },
  ],
};

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    let folder;
    let imgName;
    let cropImg;
    const originalName = file.originalname.replace(/\.jpeg|\.jpg|\.png/gi, "");

    if (file.fieldname === "avatar") {
      imgName = `${req.user._id}_${originalName}`;
      folder = "avatars";
      cropImg = transformationAvatar;
    }
    if (file.fieldname === "recipe") {
      folder = `users_recipes/${req.user._id}`;
      imgName = `${req.user._id}_${originalName}_recipe`;
      cropImg = transformationRecipe;
    }
    return {
      folder: folder,
      allowed_formats: ImgParams.acceptableFileTypes,
      public_id: imgName,
      transformation: [cropImg],
      bytes: ImgParams.maxFileSize,
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
