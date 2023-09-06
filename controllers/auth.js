import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../models/user.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

dotenv.config();

const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

const accessTokenExpires = "30m";

const signUp = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
  });

  const payload = {
    id: newUser._id,
  };

  const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, { expiresIn: accessTokenExpires });

  const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: "7d" });

  await User.findByIdAndUpdate(newUser._id, { accessToken, refreshToken });

  res.status(201).json({
    accessToken,
    refreshToken,
    user: {
      name: newUser.name,
      email: newUser.email,
    },
  });
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!user || !passwordCompare) {
    throw HttpError(401, "Email  or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  if (!user || !passwordCompare) {
    throw HttpError(401, "Email  or password is wrong");
  }

  const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, { expiresIn: accessTokenExpires });

  const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: "7d" });
  await User.findByIdAndUpdate(user._id, { accessToken, refreshToken });
  res.json({
    accessToken,
    refreshToken,
    user: { name: user.name, email: user.email, avatarURL: user.avatarURL },
  });
};

const getRefreshToken = async (req, res, next) => {
  const { refreshToken: token } = req.body;
  try {
    const { id } = jwt.verify(token, REFRESH_SECRET_KEY);

    const isExist = await User.findOne({ refreshToken: token });
    if (!isExist) {
      next(HttpError(403), "Token invalid");
    }

    const payload = {
      id,
    };

    const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, { expiresIn: accessTokenExpires });

    const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: "7d" });

    await User.findByIdAndUpdate(isExist._id, { accessToken, refreshToken });

    res.json({ accessToken, refreshToken });
  } catch (error) {
    next(HttpError(403), error.message);
  }
};

const getCurrentUser = async (req, res) => {
  const { name, email, avatarURL } = req.user;

  res.json({
    name,
    email,
    avatarURL,
  });
};

const logoutUser = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { accessToken: "", refreshToken: "" });
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
  const { _id } = req.user;

  if (!req.file) {
    throw HttpError(404, "File not found for upload");
  }

  const avatarURL = req.file.path;

  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};

export default {
  signUp: ctrlWrapper(signUp),
  signIn: ctrlWrapper(signIn),
  getRefreshToken: ctrlWrapper(getRefreshToken),
  getCurrentUser: ctrlWrapper(getCurrentUser),
  logoutUser: ctrlWrapper(logoutUser),
  updateUserName: ctrlWrapper(updateUserName),
  updateAvatar: ctrlWrapper(updateAvatar),
};
