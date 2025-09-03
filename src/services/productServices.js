import responseMessage from "../constants/resMessage.js";
import Product from "../db/models/Product.js";
import countPaginationQuery from "../utils/pagination/countPaginationQuery.js";

export const getAllProducts = async (
  { pagination: 
    { page = defaultPaginationReview.page, 
      limit = defaultPaginationReview.limit 
    }, 
    ...query }) => {
  const offset = (page - 1) * limit;
  const { count, rows: products } = await Product.findAndCountAll({
    where: query,
    include: [{ model: Category, as: 'category', attributes: ['id', 'name'] }],
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
