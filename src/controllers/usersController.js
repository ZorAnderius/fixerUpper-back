import responseMessage from "../constants/resMessage.js";
import RegisterUser from "../dto/users/register.js"
import { register } from "../services/usersService.js";
import { setRefreshTokenCookie } from "../utils/setRefreshTokenCookie.js";

export const registerController = async (req, res, next) => {
  const dataDTO = new RegisterUser(req.body);
  const ip = req.ip;
  const userAgent = req.get('User-Agent');
  const { user, tokens } = await register({ ...dataDTO, ip, userAgent });
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