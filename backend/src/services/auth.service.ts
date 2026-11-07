import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET, TOKEN_EXPIRES_IN } from "../config/env";
import { pool } from "../database/pool";

// Confere as credenciais no banco e devolve o token, ou null se estiverem erradas
export async function login(
  username: string,
  password: string,
): Promise<string | null> {
  const { rows } = await pool.query(
    "SELECT password_hash FROM login WHERE username = $1",
    [username],
  );

  if (!rows[0] || !(await bcrypt.compare(password, rows[0].password_hash))) {
    return null;
  }

  return jwt.sign({ username }, JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: TOKEN_EXPIRES_IN,
  });
}

// Lança um erro se o token for inválido ou estiver expirado
export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET, { algorithms: ["HS256"] });
}
