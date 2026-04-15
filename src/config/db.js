import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  connectionString: process.env.PG_URI,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const connectPostgres = async () => {
  try {
    await pool.connect();
    console.log("Postgres Connected");
  } catch (err) {
    console.error("Postgres Error", err.message);
    process.exit(1);
  }
};
