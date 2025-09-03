import express from "express";
import ctrlWrapper from "../utils/ctrlWrapper.js";
import secureInput from "../middlewares/secureInput.js";
import apiLimit from "../middlewares/requestLimit/apiRequest.js";
import auth from "../middlewares/authenticate.js";
import { originGuards } from "../middlewares/middlewareSet.js";
import { getAllOrdersController, getOrderByIdController } from "../controllers/ordersController.js";

const ordersRouter = express.Router();

ordersRouter.use(auth);

ordersRouter.get('/', [...originGuards, secureInput, ...apiLimit], ctrlWrapper(getAllOrdersController));

ordersRouter.get('/:id', [...originGuards, secureInput, ...apiLimit], ctrlWrapper(getOrderByIdController));

export default ordersRouter;