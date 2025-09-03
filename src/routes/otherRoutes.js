import express from "express";
import { getAllCategoriesController } from "../controllers/otherController.js";
import { originGuards } from "../middlewares/middlewareSet.js";
import secureInput from "../middlewares/secureInput.js";
import apiLimit from "../middlewares/requestLimit/apiRequest.js";
import ctrlWrapper from "../utils/ctrlWrapper.js";

const otherRoutes = express.Router();

otherRoutes.get('/categories', [...originGuards, secureInput, ...apiLimit], ctrlWrapper(getAllCategoriesController));

export default otherRoutes;
