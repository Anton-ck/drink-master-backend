import Joi from "joi";

export const cocktailSchema = Joi.object({
  drink: Joi.string().min(2).required(),
  drinkAlternate: Joi.string(),
  tags: Joi.string(),
  video: Joi.string(),
  description: Joi.string(),
  category: Joi.string().required(),
  IBA: Joi.string(),
  alcoholic: Joi.string(),
  glass: Joi.string().required(),
  instructions: Joi.string().min(3).required(),
  instructionsES: Joi.string(),
  instructionsDE: Joi.string(),
  instructionsFR: Joi.string(),
  instructionsIT: Joi.string(),
  instructionsRU: Joi.string(),
  instructionsPL: Joi.string(),
  instructionsUK: Joi.string(),
  drinkThumb: Joi.string(),
  ingredients: Joi.array().items(Joi.string().required()).required(),
  usersFavorite: Joi.array().items(Joi.string()),
});
