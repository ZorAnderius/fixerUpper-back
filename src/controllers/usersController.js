import createHttpError from "http-errors";
import { USER_AVATAR_FOLDER } from "../constants/cloudinary.js";
import responseMessage from "../constants/resMessage.js";
import GoogleOAuthDTO from "../dto/users/googleOAuthDTO.js";
import LoginUser from "../dto/users/login.js";
import RegisterUser from "../dto/users/register.js"
import { getRefreshToken } from "../services/refreshTokenServices.js";
import { authenticateWithGoogleOAuth, findUserById, login, logout, refreshTokens, register, updateAvatar } from "../services/usersService.js";
import { generateAuthUrl } from "../utils/googleOAuth.js";
import { setCSRFTokenCookie } from "../utils/setCRSFTokenCookie.js";
import { setRefreshTokenCookie } from "../utils/setRefreshTokenCookie.js";

export const registerController = async (req, res, next) => {
  const userData = new RegisterUser(req.body);
  const ip = req.ip;
  const userAgent = req.get('User-Agent');
  const { user, tokens } = await register({ userData, ip, userAgent });
  setRefreshTokenCookie(res, tokens.refreshToken);
  setCSRFTokenCookie(res, tokens.csrfToken);
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
  setCSRFTokenCookie(res, tokens.csrfToken);
  res.json({
    status: 200,
    message: responseMessage.USER.LOGIN,
    data: {
      user,
      accessToken: tokens.accessToken
    }
  })
}

export const userGoogleOAuthController = (req, res) => {
  const url = generateAuthUrl();
  res.json({
    message: responseMessage.USER.SUCCESS_REQUEST_OAUTH,
    data: { url },
  });
};


export const authenticateWithGoogleOAuthController = async (req, res, next) => {
  const { code } = new GoogleOAuthDTO(req.body);
  const ip = req.ip;
  const userAgent = req.get('User-Agent');
  const { user, tokens } = await authenticateWithGoogleOAuth({ code, ip, userAgent });
  setRefreshTokenCookie(res, tokens.refreshToken);
  setCSRFTokenCookie(res, tokens.csrfToken);
  res.json({
    status: 200,
    message: responseMessage.USER.SUCCESS_OAUTH,
    data: {
      user,
      accessToken: tokens.accessToken,
    },
  });
};

export const logoutController = async (req, res, next) => {
  const userId = req.user.id;
  const jti = req.jti;
  await logout({ userId, jti });
  res.status(204).send();
}

export const currentUserController = async (req, res, next) => {
  const data = await findUserById(req.user.id);
  res.json({
    status: 200,
    message: responseMessage.USER.CURRENT,
    data
  })
}

export const updateAvatarController = async (req, res, next) => {
  const { id } = req.user;
  const data = await updateAvatar({ id, file: req.file, folderName: USER_AVATAR_FOLDER });
  res.json({
    status: 200,
    message: responseMessage.USER.UPDATE_AVATAR,
    data,
  });
}

export const refreshTokensController = async (req, res, next) => {
  const { refreshToken: cookieToken } = req.cookies || {};
  if (!cookieToken) {
    throw createHttpError(401, 'No refresh token provided');
  }
  const ip = req.ip;
  const userAgent = req.get('User-Agent');
  const { user, tokens } = await refreshTokens({ cookieToken, ip, userAgent });
  setRefreshTokenCookie(res, tokens.refreshToken);
  setCSRFTokenCookie(res, tokens.csrfToken);
  res.json({
    status: 200,
    message: 'Refresh token was syccessfully retrived',
    data: {
      user,
      accessToken: tokens.accessToken,
    }
  });
};