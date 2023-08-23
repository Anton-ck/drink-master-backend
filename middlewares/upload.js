import multer from "multer";
import path from "path";
import HttpError from "../helpers/HttpError.js";

const tempDir = path.resolve("tmp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
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
