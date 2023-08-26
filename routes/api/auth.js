import express from "express";

import { registerSchema, loginSchema, updateUserName, userEmailSchema } from "../../schemas/user.js";

import validateBody from "../../middlewares/validateBody.js";
import isEmptyBody from "../../middlewares/isEmptyBody.js";
import authenticate from "../../middlewares/authenticate.js";
import upload from "../../middlewares/upload.js";

import controllers from "../../controllers/auth.js";

const router = express.Router();

router.post("/signup", isEmptyBody, validateBody(registerSchema), controllers.signUp);

router.post("/signin", isEmptyBody, validateBody(loginSchema), controllers.signIn);

router.get("/current", authenticate, controllers.getCurrentUser);

router.post("/logout", authenticate, controllers.logoutUser);

router.patch("/avatars", authenticate, upload.single("avatar"), controllers.updateAvatar);

router.patch("/", authenticate, validateBody(updateUserName), controllers.updateUserName);

router.post("/subscribe", isEmptyBody, authenticate, validateBody(userEmailSchema), controllers.subscribeUser);

export default router;
