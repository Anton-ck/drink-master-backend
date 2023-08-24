import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import gravatar from "gravatar";
import path from "path";
import fs from "fs/promises";
import Jimp from "jimp";

import User from "../models/user.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

dotenv.config();

const { SECRET_KEY, BASE_URL } = process.env;

const avatarsDir = path.resolve("avatars");
const tempDirResize = path.resolve("resize");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const avatarURL = gravatar.url(email);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });

  res.status(201).json({
    user: {
      name: newUser.name,
      email: newUser.email,
    },
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email is wrong");
  }

  // if (!user.verify) {
  //   throw HttpError(401, "Verification invalid");
  // }

  const passwordCompare = await bcrypt.compare(password, user.password);

  const payload = {
    id: user._id,
  };

  if (!passwordCompare) {
    throw HttpError(401, "Password is wrong");
  }

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: { email: user.email },
  });
};

const getCurrentUser = async (req, res) => {
  const { email } = req.user;

  res.json({
    email,
  });
};

const logoutUser = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json();
};

const updateUserName = async (req, res) => {
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(_id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ name: result.name });
};

const updateAvatar = async (req, res) => {
  if (!req.file) {
    throw HttpError(404, "File not found for upload");
  }
  const { _id } = req.user;
  const { path: tempDir, originalname } = req.file;

  const sizeImg = "250x250_";
  const fileName = `${_id}_${originalname}`;
  const resizeFileName = `${sizeImg}${fileName}`;
  const resultUpload = path.join(avatarsDir, resizeFileName);
  const resizeResultUpload = path.join(tempDirResize, resizeFileName);

  const reziseImg = await Jimp.read(tempDir);

  reziseImg
    .autocrop()
    .cover(250, 250)
    .writeAsync(`${tempDirResize}/${resizeFileName}`);

  await fs.unlink(tempDir);
  await fs.rename(resizeResultUpload, resultUpload);

  const avatarURL = path.join("avatars", resizeFileName);

  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};

export default {
  registerUser: ctrlWrapper(registerUser),
  loginUser: ctrlWrapper(loginUser),
  getCurrentUser: ctrlWrapper(getCurrentUser),
  logoutUser: ctrlWrapper(logoutUser),
  updateUserName: ctrlWrapper(updateUserName),
  updateAvatar: ctrlWrapper(updateAvatar),
};
