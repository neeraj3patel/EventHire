import app from './app.js';
import { env } from './config/env.js';
import { connectDB, disconnectDB } from './config/db.js';
import { logger } from './utils/logger.js';

const start = async () => {
  await connectDB();
  const server = app.listen(env.PORT, () => logger.info(`API running on port ${env.PORT} (${env.NODE_ENV})`));

  const shutdown = async (signal) => {
    logger.info(`${signal} received, shutting down`);
    server.close(async () => {
      await disconnectDB();
      process.exit(0);
    });
  };
  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('unhandledRejection', (err) => { logger.error('Unhandled rejection', err); shutdown('unhandledRejection'); });
};

start().catch((err) => {
  logger.error('Failed to start server', err);
  process.exit(1);
});
