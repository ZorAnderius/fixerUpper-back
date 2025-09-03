import UpdateCartItemDTO from "./UpdateCartItemDTO.js";

class CartItemDTO extends UpdateCartItemDTO {
  constructor(body) {
    super(body);
    this.product_id = body.product_id;
  }
}

export default CartItemDTO;