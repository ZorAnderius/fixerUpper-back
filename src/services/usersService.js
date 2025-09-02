import bcrypt from 'bcrypt';
import createHttpError from "http-errors";
import responseMessage from "../constants/resMessage.js";
import User from "../db/models/User.js";
import { generateTokens } from '../utils/tokenServices.js';

export const findUser = async query => {
  return await User.findOne({ where: query });
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