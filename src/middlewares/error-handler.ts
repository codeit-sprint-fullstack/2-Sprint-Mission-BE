import { ErrorRequestHandler } from '#types/request.type.js';
import HTTP_CODES from '#utils/constants/http-codes.js';
import { HttpError } from '#utils/http-errors.js';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);
  // logErrorWithRequest(err, req);
  if (err instanceof HttpError) {
    res.status(err.status).send({ message: err.message });
  } else if (err.name === 'UnauthorizedError') {
    // NOTE express-jwt error
    res.status(HTTP_CODES.UNAUTHORIZED).send({ message: err.message });
  } else {
    res.status(HTTP_CODES.SERVER_ERROR).send({ message: err.message });
  }
};

export default errorHandler;
