# Backend - Sistema de Conferência Municipal de Saúde

Backend desenvolvido em Node.js com Express para gerenciar inscrições e participantes da conferência municipal de saúde.

## Tecnologias

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **SQLite** - Banco de dados
- **JWT** - Autenticação
- **express-validator** - Validação de dados
- **bcryptjs** - Criptografia de senhas
- **helmet** - Segurança
- **cors** - Controle de acesso

## Estrutura do Projeto

```
backend/
├── config/           # Configurações (banco de dados)
├── controllers/      # Controladores (lógica de negócio)
├── middleware/       # Middlewares (autenticação, validação)
├── models/          # Modelos de dados
├── routes/          # Rotas da API
├── utils/           # Utilitários
├── .env             # Variáveis de ambiente
├── .env.example     # Exemplo de variáveis de ambiente
├── server.js        # Servidor principal
└── package.json     # Dependências
```

## Instalação

1. Instalar dependências:
```bash
cd backend
npm install
```

2. Configurar variáveis de ambiente:
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

3. Inicializar banco de dados:
```bash
npm run init-db
```

4. Iniciar servidor:
```bash
# Desenvolvimento (com nodemon)
npm run dev

# Produção
npm start
```

O servidor estará rodando em `http://localhost:3001`

## Variáveis de Ambiente

```env
PORT=3001                                    # Porta do servidor
NODE_ENV=development                         # Ambiente (development/production)
JWT_SECRET=sua_chave_secreta                # Chave secreta JWT
JWT_EXPIRES_IN=24h                          # Tempo de expiração do token
ADMIN_PASSWORD=conferencia2025              # Senha administrativa
DB_PATH=./database.sqlite                   # Caminho do banco de dados
```

## API Endpoints

### Autenticação

#### POST /api/auth/login
Login administrativo
```json
Request:
{
  "password": "conferencia2025"
}

Response:
{
  "success": true,
  "token": "jwt_token_here",
  "expiresIn": "24h"
}
```

#### GET /api/auth/verify
Verificar token (requer autenticação)
```json
Response:
{
  "success": true,
  "user": {
    "role": "admin",
    "timestamp": 1234567890
  }
}
```

#### POST /api/auth/refresh
Renovar token (requer autenticação)
```json
Response:
{
  "success": true,
  "token": "new_jwt_token_here",
  "expiresIn": "24h"
}
```

### Participantes

#### POST /api/participants
Criar inscrição (público)
```json
Request:
{
  "name": "João Silva",
  "email": "joao@email.com",
  "cpf": "12345678901",
  "phone": "11987654321",
  "address": "Rua Example, 123",
  "city": "São Paulo",
  "state": "SP",
  "zipcode": "01234567",
  "category": "Profissional de Saúde",
  "organization": "UBS Centro",
  "notes": "Observações adicionais"
}

Response:
{
  "success": true,
  "message": "Inscrição realizada com sucesso",
  "participant": { ... }
}
```

#### GET /api/participants/check
Verificar inscrição (público)
```
GET /api/participants/check?email=joao@email.com
ou
GET /api/participants/check?cpf=12345678901

Response:
{
  "success": true,
  "registered": true,
  "participant": {
    "name": "João Silva",
    "email": "joao@email.com",
    "category": "Profissional de Saúde",
    "registration_date": "2025-01-01T00:00:00.000Z",
    "status": "active"
  }
}
```

#### GET /api/participants
Listar participantes (requer autenticação)
```
GET /api/participants?category=Profissional&status=active&search=joão

Response:
{
  "success": true,
  "total": 1,
  "participants": [ ... ]
}
```

#### GET /api/participants/stats
Obter estatísticas (requer autenticação)
```json
Response:
{
  "success": true,
  "stats": {
    "totals": {
      "total": 150,
      "active": 145,
      "inactive": 5
    },
    "byCategory": [
      {
        "category": "Profissional de Saúde",
        "count_by_category": 80
      },
      ...
    ]
  }
}
```

#### GET /api/participants/:id
Buscar participante por ID (requer autenticação)
```json
Response:
{
  "success": true,
  "participant": { ... }
}
```

#### PUT /api/participants/:id
Atualizar participante (requer autenticação)
```json
Request:
{
  "name": "João Silva",
  "email": "joao@email.com",
  "cpf": "12345678901",
  "phone": "11987654321",
  "address": "Rua Example, 123",
  "city": "São Paulo",
  "state": "SP",
  "zipcode": "01234567",
  "category": "Profissional de Saúde",
  "organization": "UBS Centro",
  "status": "active",
  "notes": "Observações adicionais"
}

Response:
{
  "success": true,
  "message": "Participante atualizado com sucesso",
  "participant": { ... }
}
```

#### DELETE /api/participants/:id
Deletar participante (requer autenticação)
```json
Response:
{
  "success": true,
  "message": "Participante deletado com sucesso"
}
```

### Health Check

#### GET /api/health
Verificar status da API
```json
Response:
{
  "status": "ok",
  "message": "API da Conferência Municipal de Saúde está funcionando",
  "timestamp": "2025-01-01T00:00:00.000Z"
}
```

## Autenticação

A API usa JWT (JSON Web Tokens) para autenticação. Para acessar rotas protegidas:

1. Faça login via POST /api/auth/login
2. Obtenha o token JWT
3. Inclua o token no header das requisições:
```
Authorization: Bearer seu_token_aqui
```

## Segurança

- **Helmet**: Headers de segurança HTTP
- **Rate Limiting**: Máximo de 100 requisições por 15 minutos
- **CORS**: Controle de origem configurável
- **JWT**: Tokens com expiração
- **Validação**: Validação de dados de entrada

## Modelo de Dados

### Participante

```javascript
{
  id: INTEGER,
  name: TEXT,
  email: TEXT (único),
  cpf: TEXT (único),
  phone: TEXT,
  address: TEXT,
  city: TEXT,
  state: TEXT,
  zipcode: TEXT,
  category: TEXT,
  organization: TEXT,
  registration_date: DATETIME,
  status: TEXT (active/inactive),
  notes: TEXT
}
```

## Desenvolvimento

### Scripts Disponíveis

- `npm start` - Iniciar servidor em produção
- `npm run dev` - Iniciar servidor em desenvolvimento (com nodemon)
- `npm run init-db` - Inicializar banco de dados

### Estrutura de Código

#### Controllers
Contêm a lógica de negócio das rotas.

#### Models
Definem a estrutura de dados e métodos de acesso ao banco de dados.

#### Middleware
- **auth.js**: Verifica tokens JWT
- **validation.js**: Valida dados de entrada

#### Routes
Definem os endpoints da API e suas validações.

## Testes

Para testar a API, você pode usar:
- Postman
- Insomnia
- curl
- Thunder Client (VS Code)

Exemplo com curl:
```bash
# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"password":"conferencia2025"}'

# Criar inscrição
curl -X POST http://localhost:3001/api/participants \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@email.com",
    "cpf": "12345678901",
    "category": "Profissional de Saúde"
  }'

# Listar participantes (com autenticação)
curl -X GET http://localhost:3001/api/participants \
  -H "Authorization: Bearer seu_token_aqui"
```

## Produção

Para deploy em produção:

1. Configure as variáveis de ambiente adequadas
2. Use NODE_ENV=production
3. Configure HTTPS
4. Use um processo manager (PM2, systemd)
5. Configure backup do banco de dados
6. Implemente logs apropriados

Exemplo com PM2:
```bash
npm install -g pm2
pm2 start server.js --name conferencia-api
pm2 save
pm2 startup
```

## Suporte

Para questões ou problemas, entre em contato com a equipe de desenvolvimento.
