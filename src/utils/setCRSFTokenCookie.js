import ENV_VARS from '../constants/envVars.js';
import { CSRF_TOKEN_COOKIE, MAX_AGE_CSRF_TOKEN } from '../constants/tokenLifeTime.js';
import env from './envConfig.js';

export const setCSRFTokenCookie = (res, token) => {
  const isProduction = env(ENV_VARS.NODE_ENV) === 'production';
  
  // For cross-domain requests (localhost -> render.com), we need special settings
  const cookieOptions = {
    httpOnly: false,
    secure: true, // Always secure for cross-domain
    sameSite: 'None', // Must be None for cross-domain
    maxAge: MAX_AGE_CSRF_TOKEN * 1000,
    path: '/',
    domain: undefined, // Don't set domain to allow cross-domain access
  };
  
  console.log('🍪 Setting CSRF token cookie:', {
    token: token.substring(0, 10) + '...',
    options: cookieOptions,
    isProduction,
    nodeEnv: env(ENV_VARS.NODE_ENV)
  });
  
  res.cookie(CSRF_TOKEN_COOKIE, token, cookieOptions);
};

export const clearCSRFTokenCookie = res => {
  const isProduction = env(ENV_VARS.NODE_ENV) === 'production';
  res.clearCookie(CSRF_TOKEN_COOKIE, {
    httpOnly: false,
    secure: isProduction,
    sameSite: isProduction ? 'None' : 'Lax', // Use Lax for local development
  });
};