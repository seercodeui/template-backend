import http from 'http';

import { createApp } from './app';
import { pool } from './config/db';
import { env } from './config/env';

const app = createApp();
const server = http.createServer(app);

let isShuttingDown = false;

async function start() {
  try {
    // Проверяем подключение к БД
    await pool.query('SELECT 1');
    console.log('✅ DB connected');

    server.listen(env.PORT, () => {
      console.log(`🚀 Server started on ${env.PORT} (${env.NODE_ENV})`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

start();

/**
 * Graceful shutdown
 */
async function shutdown(signal: string) {
  if (isShuttingDown) return;
  isShuttingDown = true;

  console.log(`\n🛑 Shutting down... (${signal})`);

  // Таймаут на принудительное завершение
  const forceExitTimeout = setTimeout(() => {
    console.error('⏱ Force shutdown');
    process.exit(1);
  }, 10_000);

  try {
    console.log('🔌 Closing DB connections...');
    await pool.end();
    console.log('✅ DB pool closed');

    console.log('🧹 Closing HTTP server...');
    server.close((err) => {
      if (err) {
        console.error('Shutdown error:', err);
        process.exit(1);
      }

      clearTimeout(forceExitTimeout);
      console.log('👋 Shutdown complete');
      process.exit(0);
    });
  } catch (error) {
    console.error('❌ Error during shutdown:', error);
    process.exit(1);
  }
}

// Системные сигналы
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

// Непойманные ошибки
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  shutdown('uncaughtException');
});

process.on('unhandledRejection', (reason) => {
  console.error('❌ Unhandled Rejection:', reason);
  shutdown('unhandledRejection');
});
