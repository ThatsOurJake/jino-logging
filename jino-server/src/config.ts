import path from 'path';

interface BaseTransport {
  isEnabled: boolean;
}

interface FileTransport extends BaseTransport {
  location: string;
}

interface Transports {
  file: FileTransport;
}

interface Config {
  transports: Transports;
  port: string | number;
  cors: string;
}

const config: Config = {
  transports: {
    file: {
      isEnabled: process.env.TRANSPORT_FILE_ENABLED === "true",
      location: process.env.TRANSPORT_FILE_LOCATION || path.resolve(__dirname, '../logs'),
    },
  },
  port: process.env.PORT || 3000,
  cors: process.env.CORS || '*',
};

export default config;
