import { Schema, model } from "mongoose";

// import handleMongooseError from "../helpers/handleMongooseError.js";
const cocktailSchema = new Schema(
  {
    drink: {
      type: String,
      required: true,
    },
    drinkAlternate: {
      type: String,
    },
    tags: {
      type: String,
    },
    video: {
      type: String,
    },
    IBA: {
      type: String,
    },
    alcoholic: {
      type: String,
      required: true,
    },
    glass: {
      type: String,
    },
    instructions: {
      type: String,
    },
    instructionsES: {
      type: String,
    },
    instructionsDE: {
      type: String,
    },
    instructionsFR: {
      type: String,
    },
    instructionsIT: {
      type: String,
    },
    instructionsRU: {
      type: String,
    },
    instructionsPL: {
      type: String,
    },
    instructionsUK: {
      type: String,
    },
    drinkThumb: {
      type: String,
    },
    ingredients: {
      type: Array,
    },
    usersFavorite: {
      type: Array,
    },
  },
  { versionKey: false }
);

const Cocktail = model("cocktail", cocktailSchema);

export default Cocktail;
