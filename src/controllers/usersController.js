import responseMessage from "../constants/resMessage.js";
import RegisterUser from "../dto/users/register.js"
import { register } from "../services/usersService.js";

export const registerController = async (req, res, next) => {
  const dataDTO = new RegisterUser(req.body);
  const data = await register(dataDTO);
  res.status(201).json({
    status: 201,
    message: responseMessage.USER.CREATED,
    data
  })
}