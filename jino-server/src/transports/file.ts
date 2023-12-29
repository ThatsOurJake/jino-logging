import fs from 'fs';
import path from 'path';

import type { Transport } from ".";
import { LogMessageDIO } from "..";
import config from "../config";
import logger from '../logger';

const constructLogMessage = (payload: LogMessageDIO): string => {
  const parsedDate = new Date(payload.timestamp).toISOString();
  const { appName, key, level, message, correlationId, custom, sessionId, stack } = payload;

  return `${parsedDate} ${level.toUpperCase()} ${appName} ${key} "${message}" ${correlationId || ''} ${sessionId || ''} ${JSON.stringify(custom) || ''} ${stack || ''}\n`;
};

const { transports: { file: { location }}} = config;

const fileTransport: Transport = {
  process: (payload: LogMessageDIO) => {
    if (!fs.existsSync(path.dirname(location))) {
      logger.error({
        key: 'error.invalid-file-location',
        message: `Invalid file location: ${location}`,
        stack: new Error().stack,
      });

      return;
    };

    const logMessage = constructLogMessage(payload);

    fs.appendFile(location, logMessage, (err) => {
      if (err) {
        logger.error({
          key: 'error.file-transport',
          message: err.message,
          stack: err.stack,
        });
      }
    });
  }
};

export default fileTransport;
