import createLogger from 'jino-client/dist/server';

const logger = createLogger({
  appName: 'jino-server',
  transports: ['console', 'http'],
});

export default logger;
