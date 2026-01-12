import http from 'http';

import { createApp } from './app.js';
import { env } from './config/env.js';

const app = createApp();
const server = http.createServer(app);

server.listen(env.PORT, () => {
  console.log(`Server started on port ${env.PORT} (${env.NODE_ENV})`);
});

function shutdown(signal: string) {
  console.log(`Shutting down... (${signal})`);
  server.close((err) => {
    if (err) {
      console.error('Shutdown error:', err);
      process.exit(1);
    }
    process.exit(0);
  });
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
