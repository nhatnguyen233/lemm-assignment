import { Pool } from "pg";
import { config } from "./config";

const pool = new Pool(config.DB_CONFIG);

export default pool;
