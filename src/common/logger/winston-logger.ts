import winston from 'winston';
import 'winston-daily-rotate-file';

const { combine, timestamp, printf } = winston.format;

const myFormat = printf(({ timestamp, level, message }) => {
  return `${timestamp} ${level}: ${message}`;
});

export const logger = winston.createLogger({
  level: 'info',
  format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), myFormat),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: 'logs/combined.log',
    }),
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
    new winston.transports.DailyRotateFile({
      filename: 'logs/%DATE%-warn.log',
      datePattern: 'YYYY-MM-DD',
      level: 'warn',
      maxFiles: '14d', // 14일간 파일 유지
      zippedArchive: true,
    }),
  ],
});
