import express from "express";

import { userEmailSchema } from "../../schemas/subscribe.js";

import validateBody from "../../middlewares/validateBody.js";
import isEmptyBody from "../../middlewares/isEmptyBody.js";
import authenticate from "../../middlewares/authenticate.js";

import controllers from "../../controllers/subscribe.js";

const router = express.Router();

router.post(
  "/",
  isEmptyBody,
  authenticate,
  validateBody(userEmailSchema),
  controllers.subscribeUser
);

export default router;
