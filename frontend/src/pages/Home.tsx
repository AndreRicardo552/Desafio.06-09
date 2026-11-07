import { useEffect, useState } from "react";

type Props = {
  token: string;
  onLogout: () => void;
};

export default function Home({ token, onLogout }: Props) {
  const [username, setUsername] = useState("");

  // Valida o token na API. Se for inválido ou tiver expirado, volta para o login.
  useEffect(() => {
    fetch("/api/me", { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        if (!response.ok) {
          throw new Error();
        }
        return response.json();
      })
      .then((user) => setUsername(user.username))
      .catch(onLogout);
  }, [token, onLogout]);

  if (!username) {
    return <main className="card">Carregando...</main>;
  }

  return (
    <main className="card">
      <h1>Login realizado!</h1>
      <p>
        Você entrou como <strong>{username}</strong>.
      </p>

      <h2>access_token recebido da API</h2>
      <code className="token">{token}</code>

      <button type="button" onClick={onLogout}>
        Sair
      </button>
    </main>
  );
}
