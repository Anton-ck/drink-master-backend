import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import Cocktail from "../models/recipes.js";

const getOwn = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Cocktail.find({ owner }, "-updatedAt").populate(
    "owner",
    "email"
  );
  res.json(result);
};

const addOwn = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Cocktail.create({ ...req.body, owner });
  res.status(201).json(result);
};

const deleteOwn = async (req, res) => {
  const { id } = req.params;
  const result = await Cocktail.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "Cocktail deleted",
  });
};

export default {
  getOwn: ctrlWrapper(getOwn),
  addOwn: ctrlWrapper(addOwn),
  deleteOwn: ctrlWrapper(deleteOwn),
};
