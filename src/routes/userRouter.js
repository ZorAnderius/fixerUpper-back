import express from "express";
import validateBody from "../utils/validateBody.js";
import ctrlWrapper from "../utils/ctrlWrapper.js";
import userRegisterSchema from "../schemas/userSchema/registerSchema.js";
import checkBodyEmpty from "../middlewares/checkBodyEmpty.js";
import { registerController } from "../controllers/usersController.js";

const userRouter = express.Router();

userRouter.post('/register', checkBodyEmpty, validateBody(userRegisterSchema), ctrlWrapper(registerController))

export default userRouter;