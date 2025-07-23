const AppError = require("../utils/AppError");
const { StatusCodes } = require("http-status-codes");

const notFoundHandler = (req, res, next) => {
  next(
    new AppError(
      StatusCodes.NOT_FOUND,
      `Can't find your requested url: '${req.originalUrl}' in the server`,
    ),
  );
};

module.exports = notFoundHandler;
