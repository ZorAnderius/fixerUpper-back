import bcrypt from 'bcrypt';
import createHttpError from "http-errors";
import responseMessage from "../constants/resMessage.js";
import User from "../db/models/User.js";
import { CLOUD_RESOURCE_MANAGER } from 'google-auth-library/build/src/auth/baseexternalclient.js';

export const findUser = async query => {
  return await User.findOne({ where: query });
}

export const register = async ({ firstName, lastName, email, password, phoneNumber }) => {
  if (!firstName || !lastName || !email || !password || !phoneNumber) throw createHttpError(400, responseMessage.USER.VALIDATE_INPUT);
  const existingUser = await findUser({ email });
  console.log(existingUser);
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

  return {
    user: {
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      phoneNumber: newUser.phoneNumber,
      avatarUrl: newUser.avatarUrl,
    }
  }
}