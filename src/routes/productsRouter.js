import express from "express";
import ctrlWrapper from "../utils/ctrlWrapper.js";
import apiLimit from "../middlewares/requestLimit/apiRequest.js";
import secureInput from "../middlewares/secureInput.js";
import auth from "../middlewares/authenticate.js";
import validateBody from "../utils/validateBody.js";
import createProductSchema from "../schemas/productsSchema/createProductSchema.js";
import updateProductSchema from "../schemas/productsSchema/updateProductSchema.js";
import upload from "../middlewares/upload.js";
import { inputSanitizationGuards, originGuards } from "../middlewares/middlewareSet.js";
import { createProductController, deleteProductController, getAllProductsController, getProductByIdController, updateProductController } from "../controllers/productsController.js";

const productsRouter = express.Router();

productsRouter.get('/', [...originGuards, secureInput, ...apiLimit], ctrlWrapper(getAllProductsController));


productsRouter.get('/:id', [
  ...originGuards,
  secureInput,
  ...apiLimit],
  ctrlWrapper(getProductByIdController));

productsRouter.use(auth);

productsRouter.post('/', [
  upload.single('product_image'),
  ...inputSanitizationGuards,
  validateBody(createProductSchema),
  ...apiLimit],
  ctrlWrapper(createProductController));

productsRouter.patch('/:id/edit', [
  upload.single('product_image'),
  ...inputSanitizationGuards,
  validateBody(updateProductSchema),
  ...apiLimit],
  ctrlWrapper(updateProductController));

  productsRouter.delete('/:id/delete', [
    ...originGuards,
    secureInput,
    ...apiLimit],
    ctrlWrapper(deleteProductController));

export default productsRouter;