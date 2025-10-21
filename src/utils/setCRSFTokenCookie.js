import ENV_VARS from '../constants/envVars.js';
import { CSRF_TOKEN_COOKIE, MAX_AGE_CSRF_TOKEN } from '../constants/tokenLifeTime.js';
import env from './envConfig.js';

export const setCSRFTokenCookie = (res, token) => {
  const isProduction = env(ENV_VARS.NODE_ENV) === 'production';
  const cookieOptions = {
    httpOnly: false,
    secure: isProduction,
    sameSite: isProduction ? 'None' : 'Lax', // Lax for localhost, None for production
    maxAge: MAX_AGE_CSRF_TOKEN * 1000,
    path: '/', // Explicitly set path
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