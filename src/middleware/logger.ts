import { createLogger, transports, format } from 'winston';
const env = process.env.NODE_ENV;
const transportErrors = [
  new transports.File({
    level: 'error',
    filename: 'logs/winston/errors.log',
    maxsize: 30000000, // 30MB
    tailable: true,
    maxFiles: 3,
  }),
];
const transportInfo = [
  new transports.File({
    level: 'info',
    filename: 'logs/winston/info.log',
    maxsize: 30000000, // 30MB
    tailable: true,
    maxFiles: 3,
  }),
  new transports.Console({
    format: format.simple(),
  }),
];
const transportWarning = [
  new transports.File({
    level: 'warn',
    filename: 'logs/winston/warning.log',
    maxsize: 30000000, // 30MB
    tailable: true,
    maxFiles: 3,
  }),
  new transports.Console({
    format: format.simple(),
  }),
];
const loggerError = createLogger({
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DDTHH:mm:ss:ms' }),
    format.printf((err) => {
      return `${JSON.stringify(err)},`;
    }),
  ),
  transports: transportErrors,
});

const loggerWarining = createLogger({
  format: format.combine(format.printf((warn) => warn.message)),
  transports: transportWarning,
});

const loggerInfo = createLogger({
  format: format.combine(format.printf((info) => info.message)),
  transports: transportInfo,
});

const infoLogger = (message) => {
  if (env !== 'test') {
    loggerInfo.info(new Date().toISOString() + ' | ' + message);
  }
};

const warningLogger = (message) => {
  if (env !== 'test') {
    loggerWarining.warn(new Date().toISOString() + ' | ' + message);
  }
};

const errorLogger = (err, req = null, res = null, next = null) => {
  loggerError.error(err.message || err, {
    date: new Date().toLocaleString(),
    statusCode: err ? err.statusCode || '500' : '500',
    url: req ? req.url : '',
    stack: err.stack,
  });

  res.status(err.statusCode || 500).send(err.message || err);
  next();
};

export {
  infoLogger,
  warningLogger,
  errorLogger,
};
