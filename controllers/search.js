
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import Cocktail  from "../models/recipes.js"; 


const getSearchRecipes = async (req, res) => {
    const { search, category, ingredients, page = 1, limit = 10 } = req.query;

    const query = {};

    if (search) {
        query.drink = { $regex: search, $options: "i" };
    }
    if (category) {
        query.category = category;
    }
    if (ingredients) {
        query.ingredients = {
            $elemMatch: { title: ingredients },
        };
    }

    const totalHits = await Cocktail.countDocuments(query);
    const pageNumber = parseInt(page);
    const skip = (pageNumber - 1) * limit;

    const drinks = await Cocktail.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    if (drinks.length === 0) {
        throw HttpError(404, "drinks not found");
    }

    res.json({ totalHits, drinks });
};

export default ctrlWrapper(getSearchRecipes);