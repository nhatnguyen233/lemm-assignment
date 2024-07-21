import pool from "../";

const createTableQuery = `
CREATE TABLE IF NOT EXISTS itineraries (
  id SERIAL PRIMARY KEY,
  from_airport VARCHAR(3) NOT NULL,
  to_airport VARCHAR(3) NOT NULL,
  requester_ip VARCHAR(45),
  timestamp TIMESTAMP
);
`;

(async function runMigration() {
  try {
    await pool.query(createTableQuery);
    console.log('Table "itineraries" created successfully');
  } catch (err) {
    console.error("Error creating table:", err);
  } finally {
    await pool.end();
  }
})();
