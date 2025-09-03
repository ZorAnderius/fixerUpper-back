import express from "express";
import auth from "../middlewares/authenticate.js";
import apiLimit from "../middlewares/requestLimit/apiRequest.js";
import ctrlWrapper from "../utils/ctrlWrapper.js";
import validateBody from "../utils/validateBody.js";
import createCartItemsSchema from "../schemas/cartsSchema/createCartItemsSchema.js";
import { createCartItemController, getCartItemsController, updateCartController } from "../controllers/cartsController.js";
import { inputSanitizationGuards, originGuards } from "../middlewares/middlewareSet.js";
import secureInput from "../middlewares/secureInput.js";
import updateCartItemsSchema from "../schemas/cartsSchema/updateCartItemSchena.js";

const cartsRouter = express.Router();

cartsRouter.use(auth);


cartsRouter.get('/', [...originGuards, secureInput, ...apiLimit], ctrlWrapper(getCartItemsController));

cartsRouter.post('/add', [...inputSanitizationGuards, validateBody(createCartItemsSchema), ...apiLimit], ctrlWrapper(createCartItemController));

cartsRouter.patch('/:id/update', [...inputSanitizationGuards, validateBody(updateCartItemsSchema), ...apiLimit], ctrlWrapper(updateCartController));

export default cartsRouter;
