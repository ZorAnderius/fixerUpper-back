import responseMessage from "../constants/resMessage.js";
import CartItemDTO from "../dto/cart/CartItemDTO.js";
import UpdateCartItemDTO from "../dto/cart/UpdateCartItemDTO.js";
import { checkoutCart, createCartItem, getCartItems, updateCart } from "../services/cartsService.js";

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

export const updateCartController = async (req, res, next) => {
  const user_id = req.user.id;
  const id = req.params.id;
  const dataDTO = new UpdateCartItemDTO(req.body);
  const { cart, message } = await updateCart({ user_id, id, ...dataDTO });
  res.json({
    status: 200,
    message,
    data: cart,
  });
};


export const checkoutCartController = async (req, res, next) => {
  const user_id = req.user.id;
  const id = req.params.id;
  const data = await checkoutCart({ user_id, id });
  res.status(201).json({
    status: 201,
    message: responseMessage.ORDER.CREATED,
    data,
  });
};
