import { FormEvent, useState } from "react";

type Props = {
  onLogin: (accessToken: string) => void;
};

export default function Login({ onLogin }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.status === 401) {
        setError("Usuário ou senha inválidos");
        return;
      }
      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();
      onLogin(data.access_token);
    } catch {
      setError("Não foi possível conectar à API");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="card">
      <h1>Entrar</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Usuário</label>
        <input
          id="username"
          type="text"
          autoComplete="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />

        <label htmlFor="password">Senha</label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </main>
  );
}
