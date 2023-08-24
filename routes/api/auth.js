import express from "express";

import { registerSchema, loginSchema, updateUserName } from "../../schemas/user.js";

import validateBody from "../../middlewares/validateBody.js";
import isEmptyBody from "../../middlewares/isEmptyBody.js";
import authenticate from "../../middlewares/authenticate.js";
import upload from "../../middlewares/upload.js";

import controllers from "../../controllers/auth.js";

const router = express.Router();

router.post("/register", isEmptyBody, validateBody(registerSchema), controllers.registerUser);

router.post("/login", isEmptyBody, validateBody(loginSchema), controllers.loginUser);

router.get("/current", authenticate, controllers.getCurrentUser);

router.post("/logout", authenticate, controllers.logoutUser);

router.patch("/avatars", authenticate, upload.single("avatar"), controllers.updateAvatar);

router.patch("/", authenticate, validateBody(updateUserName), controllers.updateUserName);

export default router;
