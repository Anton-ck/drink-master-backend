import ctrlWrapper from "../helpers/ctrlWrapper.js";
import Cocktail from "../models/recipes.js";

const addFavorite = async (req, res) => {
  const { _id } = req.user;
  const userId = _id.toString();
  const cocktailId = req.params.recipId;

  const cocktail = await Cocktail.findById(cocktailId);
  if (cocktail.usersFavorite.includes(userId)) {
    return res.status(409).json({ message: "Favorite cocktail added early" });
  }
  await Cocktail.findByIdAndUpdate(
    cocktailId,
    { $push: { usersFavorite: userId } },
    {
      new: true,
    }
  );
  const totalHits = await Cocktail.countDocuments({ usersFavorite: userId });

  delete cocktail._doc.usersFavorite;
  res.json({
    totalHits,
    ...cocktail._doc,
  });
};

const deleteFavorite = async (req, res) => {
  const { _id } = req.user;
  const userId = _id.toString();
  const cocktailId = req.params.recipId;

  const cocktail = await Cocktail.findById(cocktailId);

  if (!cocktail.usersFavorite.includes(userId)) {
    return res.status(409).json({ message: "Favorite cocktail deleted early" });
  }

  await Cocktail.findByIdAndUpdate(
    cocktailId,
    { $pull: { usersFavorite: userId.toString() } },

    {
      new: true,
    }
  );
  const totalHits = await Cocktail.countDocuments({ usersFavorite: userId });
  delete cocktail._doc.usersFavorite;
  res.json({ totalHits, ...cocktail._doc });
};

const getFavorites = async (req, res) => {
  const { _id } = req.user;
  const { page, limit } = req.query;
  const parsedLimit = parseInt(limit);
  const parsedPage = parseInt(page);
  const skip = (parsedPage - 1) * parsedLimit;

  const userId = _id.toString();

  const totalHits = await Cocktail.countDocuments({ usersFavorite: userId });

  const drinks = await Cocktail.find({ usersFavorite: userId }, "-usersFavorite ")
    .skip(skip)
    .limit(parsedLimit);

  if (drinks.length === 0) {
    return res.json({
      message: "No favorite cocktails have been added yet",
    });
  }
  res.json({ totalHits, drinks });
};

export default {
  addFavorite: ctrlWrapper(addFavorite),
  deleteFavorite: ctrlWrapper(deleteFavorite),
  getFavorites: ctrlWrapper(getFavorites),
};
