import { PoolConfig } from "pg";

export const config = {
  DB_CONFIG: {
    user: process.env.DATABASE_USER ?? "admin",
    host: process.env.DATABASE_HOST ?? "localhost",
    database: process.env.DATABASE_NAME ?? "flight_itinerary",
    password: process.env.DATABASE_PASSWORD ?? "123456",
    port: process.env.DATABASE_PORT ?? 5432,
  } as PoolConfig,
};
