import { Request, Response } from "express";
import { TOKEN_EXPIRES_IN } from "../config/env";
import * as authService from "../services/auth.service";

export async function login(req: Request, res: Response) {
  const { username, password } = req.body ?? {};
  const accessToken =
    typeof username === "string" && typeof password === "string"
      ? await authService.login(username, password)
      : null;

  if (!accessToken) {
    res.status(401).json({ message: "Usuário ou senha inválidos" });
    return;
  }

  res.json({
    access_token: accessToken,
    token_type: "Bearer",
    expires_in: TOKEN_EXPIRES_IN,
  });
}

export function me(_req: Request, res: Response) {
  res.json({ username: res.locals.user.username });
}
