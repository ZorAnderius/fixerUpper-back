import bcrypt from 'bcrypt';
import createHttpError from "http-errors";
import responseMessage from "../constants/resMessage.js";
import User from "../db/models/User.js";
import { generateTokens } from '../utils/tokenServices.js';

export const findUser = async query => {
  return await User.findOne({ where: query });
}

export const register = async ({ firstName, lastName, email, password, phoneNumber, ip, userAgent }) => {
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
      email: newUser.email,
      phoneNumber: newUser.phoneNumber,
      avatarUrl: newUser.avatarUrl,
    },
    tokens
  }
}