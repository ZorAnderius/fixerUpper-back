import responseMessage from "../constants/resMessage.js";
import { getAllCategory } from "../services/otherServices.js";

export const getAllCategoriesController = async (req, res) => {
  const data = await getAllCategory();
  res.json({
    status: 200,
    message: responseMessage.OTHER.CATEGORY_RETRIEVED,
    data
  });
};
