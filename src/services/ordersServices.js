import createHttpError from "http-errors";
import Category from "../db/models/Category.js";
import Order from "../db/models/Order.js";
import OrderItem from "../db/models/OrderItem.js";
import Product from "../db/models/Product.js";
import ProductStatus from "../db/models/ProductStatus.js";
import User from "../db/models/User.js";
import countPaginationQuery from "../utils/pagination/countPaginationQuery.js";

export const generateOrderNumber = async ({ transaction } = {}) => {
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomPart = Math.floor(1000 + Math.random() * 9000);

  const orderNumber = `${datePart}-${randomPart}`;

  const exist = await Order.findOne({
    where: {
      order_number: orderNumber,
    },
    transaction,
  });

  if (exist) {
    return generateOrderNumber(transaction);
  }
  return orderNumber;
};

export const getOrderById = async (id) => {
  const order = await Order.findOne({
    where: { id },
    attributes: { exclude: ['user_id', 'updatedAt'] },
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'firstName', 'lastName']
      },
      {
        model: OrderItem,
        as: 'orderItems',
        attributes: { exclude: ['order_id', 'product_id'] },
        include: [
          {
            model: Product,
            as: 'products',
            attributes: ['id', 'title', 'image_url'],
            include: [
              { model: ProductStatus, as: 'status', attributes: ['id', 'status'] },
              { model: Category, as: 'category', attributes: ['id', 'name'] }
            ]
          },
        ]
      },
    ],
    order: [['createdAt', 'DESC']],
  });
  if (!order) throw createHttpError(404, responseMessage.ORDER.NOT_FOUND);
  return order;
};

export const getAllOrders = async ({ user_id, pagination: { page = 1, limit = 10 }, filter = {} }) => {
  const offset = (page - 1) * limit;
  const { count, rows: orders } = await Order.findAndCountAll({
    where: { user_id, ...filter },
    attributes: { exclude: ['user_id'] },
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'firstName', 'lastName']
      },
      {
        model: OrderItem,
        as: 'orderItems',
        attributes: { exclude: ['order_id', 'product_id'] },
        include: [
          {
            model: Product,
            as: 'products',
            attributes: ['id', 'title', 'image_url'],
            include: [
              { model: ProductStatus, as: 'status', attributes: ['id', 'status'] },
              { model: Category, as: 'category', attributes: ['id', 'name'] }
            ]
          },
        ]
      },
    ],
    order: [['createdAt', 'DESC']],
    offset,
    limit,
  });

  const paginationValues = countPaginationQuery(orders.length, page, limit);
  if (page > paginationValues.totalPages || page < 1) throw createHttpError(400, responseMessage.PRODUCT.PAGINATION);
  return orders?.length > 0
    ? {
      orders,
      ...paginationValues,
    }
    : orders;
}
