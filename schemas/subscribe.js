import Joi from "joi";

import emailRegexp from "../helpers/regExp.js";


export const userEmailSchema = Joi.object({
  email: Joi.string().pattern(new RegExp(emailRegexp)).required().messages({
    "any.required": "missing required email field",
  }),
});
