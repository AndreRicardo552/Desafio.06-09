import { Pool } from "pg";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "../config/env";

export const pool = new Pool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

// Sem este listener, uma queda do banco com conexões ociosas derrubaria a API
pool.on("error", (error) => {
  console.error("Erro em uma conexão ociosa com o banco:", error.message);
});
