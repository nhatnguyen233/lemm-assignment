import { Pool } from "pg";
import { config } from "../config";
console.log(config.DB_CONFIG);
const pool = new Pool(config.DB_CONFIG);

export default pool;
