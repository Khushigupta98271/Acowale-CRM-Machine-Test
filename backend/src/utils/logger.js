const LOG_LEVEL = process.env.LOG_LEVEL || 'info';

const LEVELS = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

const COLORS = {
  error: '\x1b[31m',    // Red
  warn: '\x1b[33m',     // Yellow
  info: '\x1b[36m',     // Cyan
  debug: '\x1b[35m',    // Magenta
  reset: '\x1b[0m',     // Reset
};

const logger = {
  error: (message, meta = {}) => {
    if (LEVELS[LOG_LEVEL] >= LEVELS.error) {
      console.error(
        `${COLORS.error}[ERROR]${COLORS.reset}`,
        new Date().toISOString(),
        message,
        Object.keys(meta).length > 0 ? meta : ''
      );
    }
  },

  warn: (message, meta = {}) => {
    if (LEVELS[LOG_LEVEL] >= LEVELS.warn) {
      console.warn(
        `${COLORS.warn}[WARN]${COLORS.reset}`,
        new Date().toISOString(),
        message,
        Object.keys(meta).length > 0 ? meta : ''
      );
    }
  },

  info: (message, meta = {}) => {
    if (LEVELS[LOG_LEVEL] >= LEVELS.info) {
      console.log(
        `${COLORS.info}[INFO]${COLORS.reset}`,
        new Date().toISOString(),
        message,
        Object.keys(meta).length > 0 ? meta : ''
      );
    }
  },

  debug: (message, meta = {}) => {
    if (LEVELS[LOG_LEVEL] >= LEVELS.debug) {
      console.log(
        `${COLORS.debug}[DEBUG]${COLORS.reset}`,
        new Date().toISOString(),
        message,
        Object.keys(meta).length > 0 ? meta : ''
      );
    }
  },
};

module.exports = logger;
