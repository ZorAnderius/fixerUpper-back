import createHttpError from "http-errors";
import responseMessage from "../constants/resMessage.js";
import Product from "../db/models/Product.js";
import countPaginationQuery from "../utils/pagination/countPaginationQuery.js";
import saveToCloudinary from "../utils/saveToClaudinary.js";
import Category from "../db/models/Category.js";
import { defaultPaginationReview } from "../constants/defaultPagination.js";
import ProductStatus from "../db/models/ProductStatus.js";

export const findProduct = async (query) => {
  return await Product.findOne({ where: query });
};

export const getAllProducts = async (
  { pagination:
    { page = defaultPaginationReview.page,
      limit = defaultPaginationReview.limit
    },
    filter = {}
  }) => {
  const offset = (page - 1) * limit;
  const { count, rows: products } = await Product.findAndCountAll({
    where: filter,
    attributes: { exclude: ['category_id', 'status_id'] },
    include: [
      { model: Category, as: 'category', attributes: ['id', 'name'] },
      { model: ProductStatus, as: 'status', attributes: ['id', 'status'] },
    ],
    offset,
    limit,
  });

  const paginationValues = countPaginationQuery(count, page, limit);
  if (page > paginationValues.totalPages || page < 1) throw createHttpError(400, responseMessage.PRODUCT.PAGINATION);
  return products?.length > 0
    ? {
      products,
      ...paginationValues,
    }
    : products;
}

export const createNewProduct = async ({ supplier_id, title, description, price, quantity, category_id, status_id, file, folderName = 'products' }) => {
  const existProduct = await findProduct(
    { title, category_id },
  );
  if (existProduct) throw createHttpError(409, responseMessage.PRODUCT.EXIST);
  let image_url = '';
  try {
    image_url = await saveToCloudinary(file, folderName);
  } catch (error) {
    throw createHttpError(500, responseMessage.PRODUCT.FAILED_SAVE_IMAGE);
  }
  return Product.create(
    {
      title,
      description,
      price,
      quantity,
      image_url,
      supplier_id,
      category_id,
      status_id,
    },
  );
};


export const getProductById = async (id) => {
  const product = await Product.findOne({
    where: { id },
    attributes: { exclude: ['category_id', 'status_id'] },
    include: [
      { model: Category, as: 'category', attributes: ['id', 'name'] },
      { model: ProductStatus, as: 'status', attributes: ['id', 'status'] },
    ],
  });
  if (!product) throw createHttpError(404, responseMessage.PRODUCT.NOT_FOUND);
  return product;
};