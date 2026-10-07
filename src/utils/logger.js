// Thin wrapper so it can be swapped for pino/winston without touching callers.
const log = (level, ...args) => {
  if (process.env.NODE_ENV === 'test') return;
  const fn = level === 'debug' ? 'log' : level;
  console[fn](`[${new Date().toISOString()}] ${level.toUpperCase()}:`, ...args);
};

export const logger = {
  error: (...a) => log('error', ...a),
  warn: (...a) => log('warn', ...a),
  info: (...a) => log('info', ...a),
  debug: (...a) => log('debug', ...a),
};
