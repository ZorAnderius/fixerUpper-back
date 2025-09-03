const responseMessage = Object.freeze({
  USER: {
    CREATED: 'User has been successfully register',
    UPDATED: 'User profile updated successfully',
    DELETED: 'User account deleted',
    NOT_FOUND: 'User not found',
    HEADER_MISSING: 'Authorization header is missing',
    INVALID_HEADER: 'Invalid authorization header',
    UNAUTHORIZED: 'Not authorized',
    VALIDATE_INPUT: 'All fields are required',
    EXIST: 'Email already in use',
    INVALID: 'Invalid email or password',
    LOGIN: 'Login successful',
    CURRENT: 'Full info about current user retrived successfully.',
    UPDATE_AVATAR: 'Avatar updated successfully',
    FAIL_UPDATE_AVATAR: 'Failed to update avatar',
    SUCCESS_OAUTH: 'Google OAuth authentication successful',
    SUCCESS_REQUEST_OAUTH: 'Successfully requested OAuth URL'
  },
  PRODUCT: {
    RETRIEVED: 'Products retrieved successfully',
    CREATED: 'Product created successfully',
    UPDATED: 'Product updated successfully',
    DELETED: 'Product removed successfully',
    NOT_FOUND: 'Product not found',
    OUT_OF_STOCK: 'Product is out of stock',
    PAGINATION: 'Page is out of range',
    EXIST: 'Product already exists',
    FAILED_SAVE_IMAGE: 'Failed to save product image',
    VALIDATE_ID: 'Invalid product ID',
  },
  TOKEN: {
    CREATED: 'Token generated successfully',
    REFRESHED: 'Token refreshed successfully',
    EXPIRED: 'Token has expired',
    INVALID: 'Refresh token is missing or invalid',
    NOT_FOUND: 'Refresh token not found',
    FORBIDDEN: 'Refresh token is forbidden'
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
    CHECK_BODY: 'Body must have at least one field',
    FORBIDDEN: 'Access denied',
    SERVER_ERROR: 'Internal server error',
    CSRF: 'CSRF header missing',
    ROUTE: 'Route not found',
    FILE_MISSING: 'File is required'
  }
})

export default responseMessage;