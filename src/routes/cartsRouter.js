import express from "express";
import auth from "../middlewares/authenticate.js";
import apiLimit from "../middlewares/requestLimit/apiRequest.js";
import ctrlWrapper from "../utils/ctrlWrapper.js";
import validateBody from "../utils/validateBody.js";
import createCartItemsSchema from "../schemas/cartsSchema/createCartItemsSchema.js";
import { createCartItemController } from "../controllers/cartsController.js";
import { inputSanitizationGuards } from "../middlewares/middlewareSet.js";

const cartsRouter = express.Router();

cartsRouter.use(auth);

cartsRouter.post('/add', [...inputSanitizationGuards, validateBody(createCartItemsSchema), ...apiLimit], ctrlWrapper(createCartItemController));

export default cartsRouter;
