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
  if (!blacklist.includes(method)) return next();

  // Skip CSRF check for certain endpoints that don't need it
  const skipCSRFPaths = ['/logout', '/refresh', '/request-google-oauth', '/confirm-oauth'];
  if (skipCSRFPaths.some(path => req.path === path || req.path.endsWith(path))) {
    return next();
  }

  // Check Origin header for additional security
  const origin = req.headers.origin;
  const referer = req.headers.referer;
  const allowedOrigins = [
    'http://localhost:5179',
    'http://localhost:3000',
    'https://fixer-upper-front.vercel.app',
    'https://fixerupper-front.vercel.app'
  ];

  if (origin && !allowedOrigins.includes(origin)) {
    console.log('🚫 CSRF: Invalid origin:', origin);
    return next(createHttpError(403, 'Invalid origin'));
  }

  const headerToken = req.headers['x-csrf-token'];
  const cookieToken = req.cookies?.csrfToken;

  console.log('🔍 CSRF Check:', {
    method: req.method,
    url: req.url,
    origin: req.headers.origin,
    headerToken: headerToken ? headerToken.substring(0, 10) + '...' : 'missing',
    cookieToken: cookieToken ? cookieToken.substring(0, 10) + '...' : 'missing',
    allCookies: req.cookies
  });

  // Check either header OR cookie token (both are valid)
  if (!headerToken && !cookieToken) {
    console.log('🚫 CSRF: No CSRF token in headers or cookies');
    return next(createHttpError(403, responseMessage.COMMON.CSRF));
  }
  
  console.log('✅ CSRF: Token validated successfully');
  next();
}

export default csrfHeaderCheck;