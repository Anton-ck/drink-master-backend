import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import Cocktail from "../models/recipes.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const { SECRET_KEY } = process.env;

const addFavorite = async (req, res) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  const { id } = jwt.verify(token, SECRET_KEY);
  const cocktailId = req.params.recipId;

  const result = await Cocktail.findByIdAndUpdate(
    cocktailId,
    { $push: { usersFavorite: id } },
    {
      new: true,
    }
  );
  res.status(201).json({ message: "Элемент добавлен в избранное" });
};

const deleteFavorite = async (req, res) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  const { id } = jwt.verify(token, SECRET_KEY);
  const cocktailId = req.params.recipId;

  const result = await Cocktail.findByIdAndUpdate(
    cocktailId,
    { $pull: { usersFavorite: id } },
    {
      new: true,
    }
  );
  res.json({ message: "Элемент удален из избранных" });
};

const getFavorites = async (req, res) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  const { id } = jwt.verify(token, SECRET_KEY);

  const { page = 1, limit = 4, ...query } = req.query;

  const skip = (page - 1) * limit;

  const result = await Cocktail.find(
    { usersFavorite: id, ...query },
    "-createdAt -updatedAt",
    {
      skip,
      limit,
    }
  );
  const array = result.map((cocktail) => {
    return {
      drink: cocktail.drink,
      alcoholic: cocktail.alcoholic,
      glass: cocktail.glass,
      instructions: cocktail.instructions,
    };
  });
  res.json(array);
};

export default {
  addFavorite: ctrlWrapper(addFavorite),
  deleteFavorite: ctrlWrapper(deleteFavorite),
  getFavorites: ctrlWrapper(getFavorites),
};
