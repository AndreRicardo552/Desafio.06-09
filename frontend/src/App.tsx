import { useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";

const TOKEN_KEY = "access_token";

export default function App() {
  // sessionStorage: o token é apagado quando a aba é fechada
  const [token, setToken] = useState(sessionStorage.getItem(TOKEN_KEY));

  function handleLogin(accessToken: string) {
    sessionStorage.setItem(TOKEN_KEY, accessToken);
    setToken(accessToken);
  }

  function handleLogout() {
    sessionStorage.removeItem(TOKEN_KEY);
    setToken(null);
  }

  return token ? (
    <Home token={token} onLogout={handleLogout} />
  ) : (
    <Login onLogin={handleLogin} />
  );
}
