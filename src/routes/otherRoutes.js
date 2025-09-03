import express from "express";
import { getAllCategoriesController, getAllProductStatusController } from "../controllers/otherController.js";
import { originGuards } from "../middlewares/middlewareSet.js";
import secureInput from "../middlewares/secureInput.js";
import apiLimit from "../middlewares/requestLimit/apiRequest.js";
import ctrlWrapper from "../utils/ctrlWrapper.js";

const otherRoutes = express.Router();

otherRoutes.get('/categories', [...originGuards, secureInput, ...apiLimit], ctrlWrapper(getAllCategoriesController));


otherRoutes.get('/product-statuses', [...originGuards, secureInput, ...apiLimit], ctrlWrapper(getAllProductStatusController));

export default otherRoutes;
