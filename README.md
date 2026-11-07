# Desafio: página de login com access_token

Página de login em React que envia usuário e senha para uma API em Express e recebe um `access_token` (JWT). Os usuários ficam em um banco PostgreSQL, com a senha criptografada (bcrypt). Depois do login, o usuário vai para uma página protegida.

## Como rodar

São necessários o Node.js 20 ou mais recente, um PostgreSQL em execução e dois terminais.

**Terminal 1: API**

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Antes de iniciar a API, preencha no `.env` os dados de acesso ao banco (`DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD` e `DB_NAME`) e troque o `JWT_SECRET` por um valor aleatório. Para gerar um:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Terminal 2: site**

```bash
cd frontend
npm install
npm run dev
```

Abra http://localhost:5173 e entre com o usuário padrão:

- **Usuário:** `admin`
- **Senha:** `admin`

## Banco de dados

O banco indicado em `DB_NAME` precisa existir. Ao iniciar, a API aplica as migrations pendentes de `backend/src/database/migrations/`, que criam a tabela `login` e o usuário padrão. A tabela `migrations` guarda o que já foi aplicado, então cada migration roda uma única vez.
