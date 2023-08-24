import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
// import Cocktail from "../models/favorite.js";

const updateFavorite = async (req, res) => {
  const recipId = req.params.recipId;
  console.log("req", req.params.recipId);

  //   const result = await Cocktail.findByIdAndUpdate(
  //     recipId,
  //     { $push: { users_favorite: userId } },
  //     {
  //       new: true,
  //     }
  //   );
  res.status(200).json({ message: "Элемент добавлен в избранное" });
};
// const getFavorites = (req, res) => {
//   const itemId = req.params.itemId;

//   // Предположим, favorites - это ваш контейнер избранных элементов
//   favorites.push(itemId);

//   res.status(200).json({ message: "Элемент добавлен в избранное" });
// };

export default {
  updateFavorite: ctrlWrapper(updateFavorite),
};
