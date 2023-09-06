import Joi from "joi";
import { joiPasswordExtendCore } from "joi-password";
const joiPassword = Joi.extend(joiPasswordExtendCore);
import emailRegexp from "../helpers/regExp.js";

export const registerSchema = Joi.object({
  name: Joi.string().min(3).max(16).required(),
  email: Joi.string().pattern(emailRegexp).required().empty(false).messages({
    "string.base": "The email must be a string.",
    "any.required": "The email field is required.",
    "string.empty": "The email must not be empty.",
    "string.pattern.base": "The email must be in format mail@mail.com.",
  }),
  password: joiPassword.string().minOfLowercase(1).minOfUppercase(1).minOfNumeric(1).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().empty(false).messages({
    "string.base": "The email must be a string.",
    "any.required": "The email field is required.",
    "string.empty": "The email must not be empty.",
    "string.pattern.base": "The email must be in format mail@mail.com.",
  }),
  password: joiPassword.string().minOfLowercase(1).minOfUppercase(1).minOfNumeric(1).required(),
});

export const refreshSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

export const updateUserName = Joi.object({
  name: Joi.string().required(),
});
