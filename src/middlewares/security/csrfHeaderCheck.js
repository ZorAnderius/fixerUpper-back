import createHttpError from 'http-errors';
import responseMessage from '../../constants/resMessage.js';

const blacklist = ["POST", "PUT", "PATCH", "DELETE"];

/**
 * Middleware to protect against CSRF attacks using a custom header.
 *
 * For state-changing HTTP methods (POST, PUT, DELETE), it checks if the
 * 'X-No-CSRF' header is present. If the header is missing, it responds
 * with 403 Forbidden.
 *
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next middleware function
 * @returns {void} Calls next() if the header is present or method is safe.
 */
const csrfHeaderCheck = (req, res, next) => {
  const method = req.method.toUpperCase();
  
  // Only check CSRF for state-changing methods (POST, PUT, PATCH, DELETE)
  if (!blacklist.includes(method)) {
    return next();
  }

  // Skip CSRF check for certain endpoints that don't need it
  const skipCSRFPaths = ['/logout', '/refresh', '/request-google-oauth', '/confirm-oauth'];
  if (skipCSRFPaths.some(path => req.path === path || req.path.endsWith(path))) {
    return next();
  }

  // Check Origin header for additional security
  const origin = req.headers.origin;
  const allowedOrigins = [
    'http://localhost:5179',
    'http://localhost:3000',
    'https://fixer-upper-front.vercel.app',
    'https://fixerupper-front.vercel.app'
  ];

  if (origin && !allowedOrigins.includes(origin)) {
    return next(createHttpError(403, 'Invalid origin'));
  }

  const headerToken = req.headers['x-csrf-token'];
  const cookieToken = req.cookies?.csrfToken;


  // Check either header OR cookie token (both are valid)
  if (!headerToken && !cookieToken) {
    return next(createHttpError(403, responseMessage.COMMON.CSRF));
  }
  next();
}

export default csrfHeaderCheck;