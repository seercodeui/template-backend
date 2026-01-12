import dotenv from 'dotenv';

dotenv.config();

export const env = {
  // App
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  PORT: Number(process.env.PORT ?? 3000),
  CORS_ORIGIN: process.env.CORS_ORIGIN ?? '',

  // Security
  JWT_SECRET: process.env.JWT_SECRET ?? '',
  ENCRYPTION_KEY: process.env.ENCRYPTION_KEY ?? '',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? '1h',
  JWT_COOKIE_MAX_AGE: Number(process.env.JWT_COOKIE_MAX_AGE ?? 3600000),

  // Database
  PGHOST: process.env.PGHOST ?? '',
  PGUSER: process.env.PGUSER ?? '',
  PGPASSWORD: process.env.PGPASSWORD ?? '',
  PGDATABASE: process.env.PGDATABASE ?? '',
  PGPORT: Number(process.env.PGPORT ?? 5432),
} as const;
