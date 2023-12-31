import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import config from './config';
import logger from './logger';
import validators from './validators';
import transports, { enabledTransports } from './transports';

const app = new Koa();
const router = new Router();

// TODO CORS

app.use(bodyParser());

export interface LogMessageDIO {
  key: string;
  message: string;
  stack?: string;
  correlationId?: string;
  sessionId?: string;
  custom?: object;
  appName: string;
  level: string;
  timestamp: number;
}

router.post('/log', (ctx) => {
  // TODO obfuscate sensitive data
  // TODO apiKey

  const payload = ctx.request.body as LogMessageDIO;
  const validatorResult = validators.validateLogMessage(payload);

  if (validatorResult.error) {
    logger.error({
      key: 'error.invalid-payload',
      message: validatorResult.error.message,
    });

    ctx.body = {
      errors: validatorResult.error.details
    };

    ctx.status = 400;
    return;
  }

  transports.forEach((transport) => {
    transport.process(payload);
  });

  ctx.status = 202;
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(config.port, () => {
  logger.info({
    key: 'app.start',
    message: `Server is listening on port ${config.port}`,
  });

  logger.info({
    key: 'app.enabled-transports',
    message: `Enabled transports: ${enabledTransports.join(', ')}`,
  });
});
