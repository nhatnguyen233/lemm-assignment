export const config = {
  PORT: process.env.PORT ?? "8001",
  NODE_ENV: String(process.env.NODE_ENV ?? "development"),
  DB_CONFIG: {
    user: String(process.env.DATABASE_USER ?? "admin"),
    host: String(process.env.DATABASE_HOST ?? "postgres"),
    database: String(process.env.DATABASE_NAME ?? "flight_itinerary"),
    password: String(process.env.DATABASE_PASSWORD ?? "123456"),
    port: Number(process.env.DATABASE_PORT ?? 5432),
  },
};
