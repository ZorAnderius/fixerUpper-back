import createHttpError from "http-errors";

const blacklist = ['POST', 'PUT', 'PATCH', 'DELETE'];

const csrfHeaderCheck = (req, res, next) => {
  const method = req.method.toUpperCase();
  if (blacklist.includes(method)) {
    if (!req.headers['x-no-csrf']) {
      next(createHttpError(403, 'CSRF header missing'));
      return;
    }
  }
  next();
}

export default csrfHeaderCheck;