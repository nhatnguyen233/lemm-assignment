import { PoolConfig } from "pg";

export const config = {
  DB_CONFIG: {
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
  } as PoolConfig,
};
