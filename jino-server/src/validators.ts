import Joi from 'joi';
import { LogMessageDIO } from '.';

const validateLogMessage = (payload: LogMessageDIO) => {
  const schema = Joi.object<LogMessageDIO>({
    key: Joi.string().required(),
    message: Joi.string().required(),
    appName: Joi.string().required(),
    level: Joi.string().required(),
    timestamp: Joi.number().required(),
    stack: Joi.string(),
    correlationId: Joi.string(),
    sessionId: Joi.string(),
    custom: Joi.object(),
  });

  return schema.validate(payload);
};

const validators = {
  validateLogMessage,
};

export default validators;
