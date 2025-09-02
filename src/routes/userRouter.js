import express from "express";
import validateBody from "../utils/validateBody.js";
import ctrlWrapper from "../utils/ctrlWrapper.js";
import userRegisterSchema from "../schemas/userSchema/registerSchema.js";
import registerLimit from "../middlewares/requestLimit/authLimit/registerLimit.js";
import { registerController } from "../controllers/usersController.js";
import { inputSanitizationGuards } from "../middlewares/middlewareSet.js";

const userRouter = express.Router();

userRouter.post('/register', [...inputSanitizationGuards, validateBody(userRegisterSchema), ...registerLimit], ctrlWrapper(registerController))

export default userRouter;