import express from "express";
import { PORT } from "./config/env";
import { runMigrations } from "./database/migrate";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(express.json());
app.use("/api", authRoutes);

async function start() {
  await runMigrations();

  app.listen(PORT, () => {
    console.log(`API rodando em http://localhost:${PORT}`);
  });
}

start().catch((error) => {
  console.error("Não foi possível iniciar a API:", error);
  process.exit(1);
});
