import createHttpError from "http-errors";
import responseMessage from "../constants/resMessage.js";

const notFoundHandler = (req, res, next) => {
  next(createHttpError(404, responseMessage.COMMON.ROUTE));
}

export default notFoundHandler;