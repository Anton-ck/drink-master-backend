import Joi from "joi";

import emailRegexp from "../helpers/regExp.js";

export const authSchema = Joi.object({
  email: Joi.string().pattern(new RegExp(emailRegexp)).required(),
  password: Joi.string().min(6).required(),
});

export const verifyEmailSchema = Joi.object({
  email: Joi.string().pattern(new RegExp(emailRegexp)).required(),
});
