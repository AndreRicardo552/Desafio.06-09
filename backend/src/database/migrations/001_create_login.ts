import bcrypt from "bcryptjs";
import { PoolClient } from "pg";

export async function up(client: PoolClient) {
  await client.query(`
    CREATE TABLE login (
      id SERIAL PRIMARY KEY,
      username TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL
    )
  `);

  // Usuário padrão: admin/admin
  const passwordHash = await bcrypt.hash("admin", 10);
  await client.query(
    "INSERT INTO login (username, password_hash) VALUES ($1, $2)",
    ["admin", passwordHash],
  );
}
