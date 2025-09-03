import { PRODUCT_IMAGE_FOLDER } from "../constants/cloudinary.js";
import responseMessage from "../constants/resMessage.js";
import ProductDTO from "../dto/product/ProductDTO.js";
import { createNewProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../services/productServices.js";
import parseFilterQuery from "../utils/pagination/parseFilterQuery.js";
import parsePaginationQuery from "../utils/pagination/parsePaginationQuery.js";

export const findProduct = async (query) => {
  return await Product.findOne({ where: query });
};

export const createProductController = async (req, res, next) => {
  const dataDTO = new ProductDTO(req.body);
  const data = await createNewProduct({ ...dataDTO, file: req.file, folderName: PRODUCT_IMAGE_FOLDER });
  res.json({
    status: 201,
    message: responseMessage.PRODUCT.CREATED,
    data,
  });
};

export const getAllProductsController = async (req, res, next) => {
  const pagination = parsePaginationQuery(req.query);
  const filter = parseFilterQuery(req.query);
  const data = await getAllProducts({ pagination, filter });
  res.json({
    status: 200,
    message: responseMessage.PRODUCT.RETRIEVED,
    data,
  });
};

export const getProductByIdController = async (req, res, next) => {
  const { id } = req.params;
  if (!id) throw createHttpError(400, responseMessage.PRODUCT.VALIDATE_ID);
  const data = await getProductById(id);
  res.json({
    status: 200,
    message: responseMessage.PRODUCT.RETRIEVED,
    data,
  });
}

export const updateProductController = async (req, res, next) => {
  const { id } = req.params;
  if (!id) throw createHttpError(400, responseMessage.PRODUCT.VALIDATE_ID);
  const dataDTO = new ProductDTO(req.body);
  const data = await updateProduct({ id , data: dataDTO, file: req.file });
  res.json({
    status: 200,
    message: responseMessage.PRODUCT.UPDATED,
    data,
  });
};

export const deleteProductController = async (req, res, next) => {
  const { id } = req.params;
  if (!id) throw createHttpError(400, responseMessage.PRODUCT.VALIDATE_ID);
  await deleteProduct(id);
  res.json({
    status: 200,
    message: responseMessage.PRODUCT.DELETED,
  });
};
