const { StatusCodes, getReasonPhrase } = require("http-status-codes");

const sendDevErrorResponse = (error, res) => {
  res.status(error.statusCode).json({
    success: error.success,
    message: error.message,
    error: {
      ...error,
      message: error.message,
      statusCodePhrase: getReasonPhrase(error.statusCode),
    },
    stack: error.stack,
  });
};

const sendProdErrorResponse = (error, res) => {
  if (error.isOperational) {
    return res.status(error.statusCode).json({
      success: error.success,
      message: error.message,
      error,
    });
  } else {
    console.error(`ERROR ⛔`, error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
      error,
    });
  }
};

const globalErrorHandler = async (error, req, res, next) => {
  error.statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  error.success = error.success || false;

  if (res.headersSent) {
    return next(error);
  }

  const env = (process.env.NODE_ENV || "development").trim();

  if (env === "development") {
    sendDevErrorResponse(error, res);
  } else if (env === "production") {
    sendProdErrorResponse(error, res);
  }
};

module.exports = globalErrorHandler;


