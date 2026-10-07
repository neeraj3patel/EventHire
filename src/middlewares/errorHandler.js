import { ApiError } from '../utils/ApiError.js';
import { logger } from '../utils/logger.js';
import { env } from '../config/env.js';

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, _req, res, _next) => {
  let error = err;

  if (err.type === 'entity.parse.failed') {
    error = ApiError.badRequest('Malformed JSON body');
  } else if (err.name === 'ValidationError') {
    error = ApiError.unprocessable(
      'Database validation failed',
      Object.values(err.errors).map((e) => ({ field: e.path, message: e.message })),
    );
  } else if (err.name === 'CastError') {
    error = ApiError.badRequest(`Invalid ${err.path}`);
  } else if (err.code === 11000) {
    error = new ApiError(409, 'Duplicate resource');
  } else if (!(err instanceof ApiError)) {
    error = new ApiError(500, 'Internal server error');
    error.isOperational = false;
  }

  if (!error.isOperational) logger.error(err);

  res.status(error.statusCode).json({
    success: false,
    message: error.message,
    ...(error.errors?.length && { errors: error.errors }),
    ...(env.NODE_ENV === 'development' && !error.isOperational && { stack: err.stack }),
  });
};
