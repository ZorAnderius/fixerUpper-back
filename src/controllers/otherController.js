import responseMessage from "../constants/resMessage.js";
import { getAllCategory, getAllProductStatus } from "../services/otherServices.js";

export const getAllCategoriesController = async (req, res, next) => {
  const data = await getAllCategory();
  res.json({
    status: 200,
    message: responseMessage.OTHER.CATEGORY_RETRIEVED,
    data
  });
};


export const getAllProductStatusController = async (req, res, next) => {
  const data = await getAllProductStatus();
  res.json({
    status: 200,
    message: responseMessage.OTHER.PRODUCT_STATUS_RETRIEVED,
    data
  });
};