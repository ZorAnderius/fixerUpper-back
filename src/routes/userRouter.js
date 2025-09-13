import express from "express";
import auth from "../middlewares/authenticate.js";
import validateBody from "../utils/validateBody.js";
import ctrlWrapper from "../utils/ctrlWrapper.js";
import userRegisterSchema from "../schemas/userSchema/registerSchema.js";
import registerLimit from "../middlewares/requestLimit/authLimit/registerLimit.js";
import authLimit from "../middlewares/requestLimit/authLimit/authLimit.js";
import userLoginSchema from "../schemas/userSchema/loginSchema.js";
import { authenticateWithGoogleOAuthController, currentUserController, loginControllers, logoutController, refreshTokensController, registerController, updateAvatarController, userGoogleOAuthController } from "../controllers/usersController.js";
import { inputSanitizationGuards, inputUnauthorisedGuard, originGuards } from "../middlewares/middlewareSet.js";
import apiLimit from "../middlewares/requestLimit/apiRequest.js";
import upload from "../middlewares/upload.js";
import authWithGoogleOAuthSchema from "../schemas/userSchema/authWithGoogleSchema.js";
import secureInput from "../middlewares/secureInput.js";

const userRouter = express.Router();

userRouter.post('/register', [...inputUnauthorisedGuard, validateBody(userRegisterSchema), ...registerLimit], ctrlWrapper(registerController))

userRouter.post('/login', [...inputUnauthorisedGuard, validateBody(userLoginSchema), ...authLimit], ctrlWrapper(loginControllers));

userRouter.get('/request-google-oauth', [...originGuards], ctrlWrapper(userGoogleOAuthController));

userRouter.post(
  '/confirm-oauth',
  [...inputUnauthorisedGuard, validateBody(authWithGoogleOAuthSchema), ...authLimit],
  ctrlWrapper(authenticateWithGoogleOAuthController)
);

userRouter.post('/refresh', [...originGuards, secureInput, ...apiLimit], ctrlWrapper(refreshTokensController));

userRouter.post('/logout', [...originGuards, auth, ...apiLimit], ctrlWrapper(logoutController));

userRouter.get('/current', [...originGuards, auth, ...apiLimit], ctrlWrapper(currentUserController));

userRouter.patch('/update-avatar', [...originGuards, auth, upload.single('avatar')], ctrlWrapper(updateAvatarController));



export default userRouter;