import { ApiError } from '../utils/ApiError.js';

/** validate(schema, 'body' | 'query' | 'params') -> parsed data on req.validated[source] */
export const validate = (schema, source = 'body') => (req, _res, next) => {
  const result = schema.safeParse(req[source]);
  if (!result.success) {
    const errors = result.error.issues.map((i) => ({ field: i.path.join('.'), message: i.message }));
    return next(ApiError.unprocessable('Validation failed', errors));
  }
  req.validated = { ...req.validated, [source]: result.data };
  next();
};
