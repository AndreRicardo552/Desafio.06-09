import * as createLogin from "./migrations/001_create_login";
import { pool } from "./pool";

// Para criar uma nova migration, adicione o arquivo em migrations/ e registre aqui
const migrations = [{ name: "001_create_login", up: createLogin.up }];

// Aplica, em ordem, as migrations que ainda não rodaram neste banco
export async function runMigrations() {
  const client = await pool.connect();

  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        name TEXT PRIMARY KEY,
        executed_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `);

    for (const migration of migrations) {
      const { rowCount } = await client.query(
        "SELECT 1 FROM migrations WHERE name = $1",
        [migration.name],
      );
      if (rowCount) {
        continue;
      }

      try {
        await client.query("BEGIN");
        await migration.up(client);
        await client.query("INSERT INTO migrations (name) VALUES ($1)", [
          migration.name,
        ]);
        await client.query("COMMIT");
        console.log(`Migration aplicada: ${migration.name}`);
      } catch (error) {
        await client.query("ROLLBACK");
        throw error;
      }
    }
  } finally {
    client.release();
  }
}
