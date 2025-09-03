import CartItemDTO from "../dto/cart/CartItemDTO.js";
import { createCartItem } from "../services/cartsService.js";

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