import responseMessage from "../constants/resMessage.js";
import CartItemDTO from "../dto/cart/CartItemDTO.js";
import { createCartItem, getCartItems } from "../services/cartsService.js";

export const createCartItemController = async (req, res, next) => {
  const user_id = req.user.id;
  const dataDTO = new CartItemDTO(req.body);
  const { cart, message } = await createCartItem({ user_id, data: dataDTO });
  res.status(201).json({
    status: 201,
    message,
    data: cart,
  });
};

export const getCartItemsController = async (req, res, next) => {
  const user_id = req.user.id;
  const cart = await getCartItems({ user_id });
  res.status(200).json({
    status: 200,
    message: responseMessage.CART_ITEM.RETRIEVED,
    data: cart,
  });
};