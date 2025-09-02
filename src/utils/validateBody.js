import createHttpError from "http-errors";

const validateBody = schema => {
  return (req, _, next) => {

    // Validates req.body against the schema; 
    // { abortEarly: false } collects all errors instead of stopping at the first one
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return next(createHttpError(400, error.message))
    }
    next();
  }
}

export default validateBody;