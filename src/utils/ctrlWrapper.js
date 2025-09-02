import { ValidationError } from "sequelize";
import responseMessage from "../constants/resMessage.js";

const ctrlWrapper = ctrl => {
  return async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      if (error instanceof ValidationError) {
        error.status = 400;
        console.log(error);
        if (error.name === 'SequelizeValidationError') {
          error.status = 409;
          error.message = responseMessage.COMMON.VALIDATION_ERROR;
        }
      }
      next(error);
    }
  }
}

export default ctrlWrapper;