import { LogMessageDIO } from "..";
import config from "../config";

import fileTransport from "./file";

export type LoggerTransport = "file";

export interface Transport {
  process: (payload: LogMessageDIO) => void;
};

const transportMap: { [key in LoggerTransport]: Transport } = {
  file: fileTransport
};

const isTransportEnabled = (transport: LoggerTransport) => {
  return config.transports[transport].isEnabled;
};

export const enabledTransports = Object.keys(config.transports).filter((x) => isTransportEnabled(x as LoggerTransport)) as LoggerTransport[];

const transports = enabledTransports.map((x) => transportMap[x]);

export default transports;
