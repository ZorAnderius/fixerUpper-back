import express from "express";
import ctrlWrapper from "../utils/ctrlWrapper.js";
import apiLimit from "../middlewares/requestLimit/apiRequest.js";
import { originGuards } from "../middlewares/middlewareSet.js";
import { getAllProducts } from "../services/productServices.js";
import secureInput from "../middlewares/secureInput.js";

const productsRouter = express.Router();

productsRouter.get('/', [...originGuards, secureInput, ...apiLimit], ctrlWrapper(getAllProducts));

export default productsRouter;