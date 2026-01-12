import type { ErrorRequestHandler } from 'express';

import { HttpError } from '../utils/httpError.js';

export const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  console.error(err);
  return res.status(500).json({ error: 'Internal Server Error' });
};
