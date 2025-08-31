const responseMessage = Object.freeze({
  USER: {
    CREATED: 'User has been successfully created',
    UPDATED: 'User profile updated successfully',
    DELETED: 'User account deleted',
    NOT_FOUND: 'User not found',
    UNAUTHORIZED: 'Not authorized',
  },
  PRODUCT: {
    CREATED: 'Product created successfully',
    UPDATED: 'Product updated successfully',
    DELETED: 'Product removed successfully',
    NOT_FOUND: 'Product not found',
    OUT_OF_STOCK: 'Product is out of stock',
  },
  TOKEN: {
    CREATED: 'Token generated successfully',
    REFRESHED: 'Token refreshed successfully',
    EXPIRED: 'Token has expired',
    INVALID: 'Refresh token is missing or invalid',
  },
  ORDER: {
    CREATED: 'Order placed successfully',
    UPDATED: 'Order updated successfully',
    CANCELED: 'Order canceled',
    NOT_FOUND: 'Order not found',
  },
  CART: {
    CREATED: 'Cart created successfully',
    UPDATED: 'Cart updated successfully',
    DELETED: 'Cart deleted',
    NOT_FOUND: 'Cart not found',
    EMPTY: 'Cart is empty',
  },
  CART_ITEM: {
    ADDED: 'Item added to cart',
    UPDATED: 'Cart item updated',
    REMOVED: 'Item removed from cart',
    NOT_FOUND: 'Cart item not found',
    OUT_OF_STOCK: 'This item is out of stock',
  },
  COMMON: {
    SUCCESS: 'Operation completed successfully',
    FAILURE: 'Something went wrong',
    VALIDATION_ERROR: 'Validation failed for the input data',
    FORBIDDEN: 'Access denied',
    SERVER_ERROR: 'Internal server error',
    CSRF: 'CSRF header missing',
    ROUTE: 'Route not found',
  }
})

export default responseMessage;