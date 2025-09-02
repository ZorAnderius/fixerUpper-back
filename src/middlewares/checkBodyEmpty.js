import createHttpError from "http-errors";
import responseMessage from "../constants/resMessage.js"

const checkBodyEmpty = (req, _, next) => {
  if (!Object.keys(req.body).length) {
    return next(createHttpError(400, responseMessage.COMMON.CHECK_BODY));
  }
  next();
}

export default checkBodyEmpty;