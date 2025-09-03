import { getAllProducts } from "../services/productServices";

export const findProduct = async (query) => {
  return await Product.findOne({ where: query });
};

export const getAllProductsController = async (req, res, next) => {
  const pagination = parsePaginationQuery(req.query);
  const filter = parseFilterQuery(req.query);
  const data = await getAllProducts({ pagination, filter });
  res.json({
    status: 200,
    message: responseMessage.PRODUCT.RETRIEVED ,
    data,
  });
}