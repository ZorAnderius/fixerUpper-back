import ENV_VARS from '../constants/envVars.js';
import { CSRF_TOKEN_COOKIE, MAX_AGE_CSRF_TOKEN } from '../constants/tokenLifeTime.js';
import env from './envConfig.js';

export const setCSRFTokenCookie = (res, token) => {
  const cookieOptions = {
    httpOnly: false,
    secure: env(ENV_VARS.NODE_ENV) === 'production',
    sameSite: 'Strict',
    maxAge: MAX_AGE_CSRF_TOKEN * 1000,
  };
  res.cookie(CSRF_TOKEN_COOKIE, token, cookieOptions);
};