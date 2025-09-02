import createHttpError from "http-errors";
import responseMessage from "../constants/resMessage.js";
import { generateAccessToken, getJTI, verifyAccessToken, verifyRefreshToken } from "../utils/tokenServices.js";
import { refreshTokenRotation } from "../services/refreshTokenServices.js";

const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return next(createHttpError(401, responseMessage.USER.HEADER_MISSING));
  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') return next(createHttpError(401, responseMessage.USER.INVALID_HEADER));
  try {
    let payload = verifyAccessToken(token);
    const { refreshToken } = req.cookies;
    if (!refreshToken) return next(createHttpError(401, responseMessage.TOKEN.NOT_FOUND));
    let accessToken = token;
    let user = null;
    if (!payload) {
      const tokenData = await verifyRefreshToken(refreshToken);
      user = tokenData.user;
      accessToken = generateAccessToken(tokenData.payload.sub, tokenData.payload.email);
      refreshTokenRotation(tokenData.payload.jti);
      payload = tokenData.payload;
      req.jti = tokenData.payload.jti;
    } else {
      const jti = refreshToken ? getJTI(refreshToken) : null;
      if (!jti) return next(createHttpError(401, responseMessage.TOKEN.INVALID));
      const data = await verifyRefreshToken(refreshToken, {
        jti,
        ip: req.ip,
        user_agent: req.get('User-Agent'),
        user_id: payload.sub
      });
      if (data.revoked) return next(createHttpError(401, responseMessage.USER.UNAUTHORIZED));
      user = data.user;
      req.jti = jti;
    }
    req.accessToken = accessToken;
    if (user) {
      req.user = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phoheNumber: user.phoheNumber,
        avatar_url: user.avatar_url,
        role: user.role,
      }
    } else {
      return next(createHttpError(401, responseMessage.USER.NOT_FOUND));
    }
  } catch (error) {
    return next(createHttpError(401, error.message));
  }
  next();
}

export default auth;