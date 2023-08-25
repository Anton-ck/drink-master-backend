import { Schema, model } from "mongoose";
import categories from "../DB/categories.json" assert { type: "json" };
import glassess from "../DB/glassess.json" assert { type: "json" };

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
    description: {
      type: String,
    },
    category: {
      type: String,
      enum: categories,
      required: true,
    },
    IBA: {
      type: String,
    },
    alcoholic: {
      type: String,
    },
    glass: {
      type: String,
      enum: glassess,
      required: true,
    },
    instructions: {
      type: String,
      required: true,
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
      // required: true,
    },
    ingredients: {
      type: Array,
      required: true,
    },
    usersFavorite: {
      type: Array,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Cocktail = model("cocktail", cocktailSchema);

export default Cocktail;
