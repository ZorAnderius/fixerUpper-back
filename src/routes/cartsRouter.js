import express from "express";
import auth from "../middlewares/authenticate.js";
import apiLimit from "../middlewares/requestLimit/apiRequest.js";
import ctrlWrapper from "../utils/ctrlWrapper.js";
import validateBody from "../utils/validateBody.js";
import createCartItemsSchema from "../schemas/cartsSchema/createCartItemsSchema.js";
import { createCartItemController, getCartItemsController } from "../controllers/cartsController.js";
import { inputSanitizationGuards, originGuards } from "../middlewares/middlewareSet.js";
import secureInput from "../middlewares/secureInput.js";

const cartsRouter = express.Router();

cartsRouter.use(auth);


cartsRouter.get('/', [...originGuards, secureInput, ...apiLimit], ctrlWrapper(getCartItemsController));

cartsRouter.post('/add', [...inputSanitizationGuards, validateBody(createCartItemsSchema), ...apiLimit], ctrlWrapper(createCartItemController));

export default cartsRouter;
