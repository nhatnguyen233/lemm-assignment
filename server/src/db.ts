import { Pool } from "pg";

const pool = new Pool({
  user: "admin",
  host: "localhost",
  database: "flight_itinerary",
  password: "123456",
  port: 5432,
});

export default pool;
