import responseMessage from "../constants/resMessage.js";

const errorHandler = (err, req, res, next) => {
  const { status = 500, message = responseMessage.COMMON.SERVER_ERROR } = err;
  res.status(status).json({
    message,
    data: err.name
  })
}

export default errorHandler;