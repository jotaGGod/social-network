/**
 * Error handling middleware.
 *
 * This middleware is used to capture and handle errors that occur during request processing.
 * It also sends an appropriate response to the client with the error status and message.
 *
 * @param {Error} err - The error object that was captured.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The middleware function that passes control to the next middleware.
 */
const errorHandler = (err, req, res, next) => {
  // Log the error to the console
  // console.error(`Some error occurred: ${err}`);

  // Send a response to the client with the error status and message
  return res.status(err.statusCode || 500).json({
    message: err.message || 'Internal Server Error'
  });
};

module.exports = errorHandler;
