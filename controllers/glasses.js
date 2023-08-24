import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import fs from "fs/promises";
import path from "path";

const glassesPath = path.resolve("DB", "glassess.json");

const getGlasses = async (req, res) => {
  const data = await fs.readFile(glassesPath);
  const parsData = JSON.parse(data);
  if (parsData.length === 0) {
    throw HttpError("500", "No glasses list");
  }
  res.json(JSON.parse(data));
};

export default {
  getGlasses: ctrlWrapper(getGlasses),
};
