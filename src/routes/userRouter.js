import express from "express";
import auth from "../middlewares/authenticate.js";
import validateBody from "../utils/validateBody.js";
import ctrlWrapper from "../utils/ctrlWrapper.js";
import userRegisterSchema from "../schemas/userSchema/registerSchema.js";
import registerLimit from "../middlewares/requestLimit/authLimit/registerLimit.js";
import authLimit from "../middlewares/requestLimit/authLimit/authLimit.js";
import userLoginSchema from "../schemas/userSchema/loginSchema.js";
import { currentUserController, loginControllers, logoutController, registerController } from "../controllers/usersController.js";
import { inputSanitizationGuards, originGuards } from "../middlewares/middlewareSet.js";

const userRouter = express.Router();

userRouter.post('/register', [...inputSanitizationGuards, validateBody(userRegisterSchema), ...registerLimit], ctrlWrapper(registerController))

userRouter.post('/login', [...inputSanitizationGuards, validateBody(userLoginSchema), ...authLimit], ctrlWrapper(loginControllers));

userRouter.post('/logout', [...originGuards, auth], ctrlWrapper(logoutController));

userRouter.get('/current', [...originGuards, auth], ctrlWrapper(currentUserController));

export default userRouter;