import express from "express";

import { authSchema, verifyEmailSchema } from "../../schemas/user.js";

import validateBody from "../../middlewares/validateBody.js";
import isEmptyBody from "../../middlewares/isEmptyBody.js";
import authenticate from "../../middlewares/authenticate.js";
import upload from "../../middlewares/upload.js";

import controllers from "../../controllers/auth.js";

const router = express.Router();

router.post("/register", isEmptyBody, validateBody(authSchema), controllers.registerUser);

router.post("/login", isEmptyBody, validateBody(authSchema), controllers.loginUser);

router.get("/verify/:verificationToken", controllers.verifyUser);

router.post("/verify", validateBody(verifyEmailSchema), controllers.resendVerify);

router.get("/current", authenticate, controllers.getCurrentUser);

router.post("/logout", authenticate, controllers.logoutUser);

router.patch("/avatars", authenticate, upload.single("avatar"), controllers.updateAvatar);

// router.patch(
//   "/",
//   authenticate,
//   validateBody(schemas.updateSubscriptionSchema),
//   controllers.updateSubscriptionUser
// );

export default router;
