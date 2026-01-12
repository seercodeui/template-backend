import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { env } from './config/env.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import { notFound } from './middlewares/notFound.middleware.js';
import { router } from './routes/index.js';

export function createApp() {
  const app = express();

  app.use(helmet());

  app.use(
    cors({
      origin: env.CORS_ORIGIN ? env.CORS_ORIGIN.split(',').map((s) => s.trim()) : true,
    }),
  );

  app.use(express.json({ limit: '1mb' }));

  app.use((req, _res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });

  app.use(router);

  app.use(notFound);
  app.use(errorMiddleware);

  return app;
}
