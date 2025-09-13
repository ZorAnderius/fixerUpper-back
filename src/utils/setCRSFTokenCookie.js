import { CSRF_TOKEN_COOKIE, MAX_AGE_CSRF_TOKEN } from '../constants/tokenLifeTime.js';

export const setCSRFTokenCookie = (res, token) => {
  const cookieOptions = {
    httpOnly: false,
    secure: env(ENV_VARS.NODE_ENV) === 'production',
    sameSite: 'Strict',
    maxAge: MAX_AGE_CSRF_TOKEN * 1000,
  };
  res.cookie(CSRF_TOKEN_COOKIE, token, cookieOptions);
};

/**
 * Clears the refresh token cookie from the client.
 *
 * @param {import('express').Response} res - Express response object.
 * @returns {void}
 *
 * @example
 * clearRefreshTokenCookie(res);
 */
export const clearRefreshTokenCookie = res => {
  res.clearCookie(REFRESH_TOKEN_COOKIE, {
    httpOnly: true,
    secure: env(ENV_VARIABLES.NODE_ENV) === 'production',
    sameSite: 'Strict',
  });
};
