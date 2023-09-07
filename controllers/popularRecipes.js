import ctrlWrapper from "../helpers/ctrlWrapper.js";
import Cocktail from "../models/recipes.js";

const getPopular = async (req, res) => {
  const { page = 1, limit = 4 } = req.query;
  const parsedLimit = parseInt(limit);
  const popularResult = await Cocktail.aggregate([
    {
      $match: {
        usersFavorite: { $exists: true, $ne: [] },
      },
    },
    {
      $project: {
        _id: 1,
        drink: 1,
        description: 1,
        instructions: 1,
        drinkThumb: 1,
        favoriteCount: {
          $size: "$usersFavorite",
        },
      },
    },
    {
      $sort: { favoriteCount: -1 },
    },
    {
      $skip: (page - 1) * parsedLimit,
    },
    {
      $limit: parsedLimit,
    },
  ]);

  console.log("popularResult", popularResult);
  if (popularResult.length === 0) {
    return res.json({
      message: "No popular cocktails yet",
    });
  }

  res.json(popularResult);
};

export default {
  getPopular: ctrlWrapper(getPopular),
};
