import express from "express";
import auth from "../middlewares/authenticate.js";
import apiLimit from "../middlewares/requestLimit/apiRequest.js";
import secureInput from "../middlewares/secureInput.js";
import ctrlWrapper from "../utils/ctrlWrapper.js";
import validateBody from "../utils/validateBody.js";
import createCartItemsSchema from "../schemas/cartsSchema/createCartItemsSchema.js";
import updateCartItemsSchema from "../schemas/cartsSchema/updateCartItemSchena.js";
import { checkoutCartController, createCartItemController, getCartItemsController, updateCartController } from "../controllers/cartsController.js";
import { inputSanitizationGuards, originGuards } from "../middlewares/middlewareSet.js";

const cartsRouter = express.Router();

cartsRouter.use(auth);


cartsRouter.get('/', [...originGuards, secureInput, ...apiLimit], ctrlWrapper(getCartItemsController));

cartsRouter.post('/add', [...inputSanitizationGuards, validateBody(createCartItemsSchema), ...apiLimit], ctrlWrapper(createCartItemController));

cartsRouter.patch('/:id/update', [...inputSanitizationGuards, validateBody(updateCartItemsSchema), ...apiLimit], ctrlWrapper(updateCartController));

cartsRouter.post('/:id/checkout', [...originGuards, secureInput, ...apiLimit], ctrlWrapper(checkoutCartController));

export default cartsRouter;
