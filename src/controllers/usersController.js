import responseMessage from "../constants/resMessage.js";
import LoginUser from "../dto/users/login.js";
import RegisterUser from "../dto/users/register.js"
import { getRefreshToken } from "../services/refreshTokenServices.js";
import { login, logout, register } from "../services/usersService.js";
import { setRefreshTokenCookie } from "../utils/setRefreshTokenCookie.js";

export const registerController = async (req, res, next) => {
  const userData = new RegisterUser(req.body);
  const ip = req.ip;
  const userAgent = req.get('User-Agent');
  const { user, tokens } = await register({ userData, ip, userAgent });
  setRefreshTokenCookie(res, tokens.refreshToken);
  res.status(201).json({
    status: 201,
    message: responseMessage.USER.CREATED,
    data: {
      user,
      accessToken: tokens.accessToken
    }
  })
}

export const loginControllers = async (req, res, next) => {
  const userData = new LoginUser(req.body);
  const ip = req.ip;
  const userAgent = req.get('User-Agent');
  const { user, tokens } = await login({ userData, ip, userAgent });
  setRefreshTokenCookie(res, tokens.refreshToken);
  res.json({
    status: 200,
    message: responseMessage.USER.LOGIN,
    data: {
      user,
      accessToken: tokens.accessToken
    }
  })
}

export const logoutController = async (req, res, next) => {
  const userId = req.user.id;
  const jti = req.jti;
  await logout({ userId, jti });
  res.status(204).send();
}