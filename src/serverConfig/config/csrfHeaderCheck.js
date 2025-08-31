import createHttpError from "http-errors";
import responseMessage from "../../constants/resMessage.js";

const blacklist = ['POST', 'PUT', 'PATCH', 'DELETE'];

const csrfHeaderCheck = (req, res, next) => {
  const method = req.method.toUpperCase();
  if (blacklist.includes(method)) {
    if (!req.headers['x-no-csrf']) {
      next(createHttpError(403, responseMessage.COMMON.CSRF));
      return;
    }
  }
  next();
}

export default csrfHeaderCheck;