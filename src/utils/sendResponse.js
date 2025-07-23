

const sendResponse = (res, { statusCode, message, success = true, data = null }) => {
    return res.status(statusCode).json({
      success,
      message,
      data,
    });
  };
  
module.exports = sendResponse;