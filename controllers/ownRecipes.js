import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import Cocktail from "../models/recipes.js";

const getOwn = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 8, ...query } = req.query;
  const skip = (page - 1) * limit;

  const totalHits = await Cocktail.countDocuments({ owner });

  const result = await Cocktail.find({ owner, ...query }, "-updatedAt", {
    skip,
    limit,
  }).populate("owner", "email");

  console.log("result", result);

  if (result.length === 0) {
    return res.json({
      message: "No cocktails have been added yet",
      cocktails: [],
    });
  }
  res.json({ totalHits, cocktails: result });
};

const addOwn = async (req, res) => {
  console.log("req", req);
  const { _id: owner } = req.user;
  const fileUrl = req.file?.path;
  const result = await Cocktail.create({
    ...req.body,
    owner,
    drinkThumb: fileUrl,
  });
  res.status(201).json(result);
};

const deleteOwn = async (req, res) => {
  const { id } = req.params;

  const cocktail = await Cocktail.findById(id);
  if (!cocktail) {
    throw HttpError(404, "The requested cocktail was not found");
  }

  await Cocktail.findByIdAndRemove(id);

  res.json({
    message: "Cocktail deleted",
  });
};

export default {
  getOwn: ctrlWrapper(getOwn),
  addOwn: ctrlWrapper(addOwn),
  deleteOwn: ctrlWrapper(deleteOwn),
};
