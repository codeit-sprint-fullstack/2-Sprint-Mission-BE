import { PrismaClient } from '@prisma/client';
import { postgresConnectionConfig } from '#configs/postgres.config.js';

const { render, url } = postgresConnectionConfig;

const connectionOption = { datasourceUrl: url };
// const connectionOption = { datasourceUrl: render };

export const prismaClient = new PrismaClient({
  ...connectionOption,
  log: [
    { level: 'info', emit: 'event' },
    { level: 'warn', emit: 'event' },
    { level: 'error', emit: 'event' },
  ],
});

prismaClient.$on('info', e => {
  console.log(e);
});

prismaClient.$on('warn', e => {
  console.log(e);
});

prismaClient.$on('error', e => {
  console.log(e);
});
