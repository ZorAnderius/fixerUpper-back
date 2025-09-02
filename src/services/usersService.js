import bcrypt from 'bcrypt';
import createHttpError from "http-errors";
import responseMessage from "../constants/resMessage.js";
import User from "../db/models/User.js";
import { generateTokens } from '../utils/tokenServices.js';
import { getRefreshToken } from './refreshTokenServices.js';
import saveToCloudinary from '../utils/saveToClaudinary.js';

export const findUser = async query => {
  return await User.findOne({ where: query });
}

export const findUserById = async id => {
  const user = await User.findByPk(id);
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
    avatar_url: user.avatar_url,
  }
}

export const register = async ({ userData, ip, userAgent }) => {
  const { firstName, lastName, email, password, phoneNumber } = userData;
  if (!firstName || !lastName || !email || !password || !phoneNumber) throw createHttpError(400, responseMessage.USER.VALIDATE_INPUT);
  const existingUser = await findUser({ email });
  if (existingUser) throw createHttpError(409, responseMessage.USER.EXIST);

  const hashedPassword = password && await bcrypt.hash(password, 12);
  const avatarUrl = '';
  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    phoneNumber,
    avatarUrl,
  });

  const tokens = await generateTokens({ id: newUser.id, email: newUser.email, ip, userAgent });
  return {
    user: {
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      avatarUrl: newUser.avatarUrl,
    },
    tokens
  }
}

export const login = async ({ userData, ip, userAgent }) => {
  const { email, password } = userData;
  if (!email || !password) throw createHttpError(400, responseMessage.USER.VALIDATE_INPUT);
  const user = await findUser({ email });
  if (!user) throw createHttpError(401, responseMessage.USER.INVALID);
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) throw createHttpError(401, responseMessage.USER.INVALID);
  const tokens = await generateTokens({ id: user.id, email: user.email, ip, userAgent })
  return {
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      avatarUrl: user.avatarUrl
    },
    tokens
  }
}

export const logout = async ({ userId, jti }) => {
  const token = await getRefreshToken({ jti });
  if (!token) throw createHttpError(404, responseMessage.TOKEN.NOT_FOUND);
  if (token.user_id !== userId) throw createHttpError(403, responseMessage.TOKEN.FORBIDDEN);
  token.revoked = true;
  await token.save();
}


export const updateAvatar = async ({ id, file, folderName }) => {
  if (!file) throw createHttpError(400, responseMessage.COMMON.FILE_MISSING);
  const user = await findUser({id});
  if (!user) throw createHttpError(401, responseMessage.USER.UNAUTHORIZED);
  try {
    const avatar_url = await saveToCloudinary(file, folderName);
    await user.update({ avatar_url}, { returning: true });
    return {
      id: user.id,
      avatarUrl: user.avatar_url,
    };
  } catch (error) {
    throw createHttpError(500, responseMessage.USER.FAIL_UPDATE_AVATAR);
  }
}