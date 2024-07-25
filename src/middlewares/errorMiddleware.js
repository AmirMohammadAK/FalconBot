import ServerError from "../errors/serverError.js";
import logger from "../helper/logger.js";

const ErrorHandlingMiddleware = (error, req, res, next) => {
  // Handle custom ServerError
  if (error instanceof ServerError) {
    return res.status(error.status).json({
      status: error.status,
      message: error.message,
    });
  }
  // Handle other errors
  else {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export default ErrorHandlingMiddleware;
