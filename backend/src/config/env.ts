import "dotenv/config";

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Configure ${name} no arquivo .env (veja o .env.example)`);
  }
  return value;
}

export const PORT = process.env.PORT || 3001;
export const JWT_SECRET = required("JWT_SECRET");
export const DB_HOST = required("DB_HOST");
export const DB_PORT = Number(required("DB_PORT"));
export const DB_USER = required("DB_USER");
export const DB_PASSWORD = required("DB_PASSWORD");
export const DB_NAME = required("DB_NAME");
export const TOKEN_EXPIRES_IN = 3600; // 1 hora, em segundos
