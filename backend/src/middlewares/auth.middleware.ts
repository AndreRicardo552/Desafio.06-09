import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../services/auth.service";

// Só deixa a requisição continuar se o token for válido e não estiver expirado
export function requireToken(req: Request, res: Response, next: NextFunction) {
  const [type, token] = (req.headers.authorization ?? "").split(" ");

  if (type !== "Bearer" || !token) {
    res.status(401).json({ message: "Token não informado" });
    return;
  }

  try {
    res.locals.user = verifyToken(token);
    next();
  } catch {
    res.status(401).json({ message: "Token inválido ou expirado" });
  }
}
