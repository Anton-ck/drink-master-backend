import Joi from "joi";
import { joiPasswordExtendCore } from "joi-password";
const joiPassword = Joi.extend(joiPasswordExtendCore);
import emailRegexp from "../helpers/regExp.js";

export const registerSchema = Joi.object({
  name: Joi.string().min(3).max(16).required(),
  email: Joi.string().pattern(new RegExp(emailRegexp)).required(),
  password: joiPassword.string().minOfLowercase(1).minOfUppercase(1).minOfNumeric(1).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().pattern(new RegExp(emailRegexp)).required(),
  password: joiPassword.string().minOfLowercase(1).minOfUppercase(1).minOfNumeric(1).required(),
});

export const updateUserName = Joi.object({
  name: Joi.string().required(),
});
