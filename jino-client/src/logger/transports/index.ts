import type { LogPayload } from "..";

import consoleTransport from "./console";
import httpTransport from "./http";
import simpleTransport from "./simple";

export type LoggerTransport = "console" | "http" | "simple";

export interface Transport {
  log: (payload: LogPayload) => void;
};

const transportMap: { [key in LoggerTransport]: Transport } = {
  console: consoleTransport,
  http: httpTransport,
  simple: simpleTransport
};

export default transportMap;
