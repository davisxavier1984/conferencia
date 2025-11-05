# Backend - Sistema de Conferência Municipal de Saúde

Backend Node.js + TypeScript para gerenciamento de inscrições da Conferência Municipal de Saúde.

## 🚀 Tecnologias

- **Node.js** + **TypeScript**
- **Express** - Framework web
- **Prisma** - ORM para banco de dados
- **SQLite** - Banco de dados local
- **Nodemailer** - Envio de emails
- **CORS** - Permitir requisições do frontend

## 📁 Estrutura do Projeto

```
conferencia-backend/
├── src/
│   ├── controllers/        # Controladores das rotas
│   ├── routes/            # Definição das rotas
│   ├── services/          # Serviços (email, etc.)
│   └── server.ts          # Servidor Express principal
├── prisma/
│   ├── schema.prisma      # Schema do banco de dados
│   └── migrations/        # Migrations do banco
├── .env                   # Variáveis de ambiente
└── package.json
```

## 🛠️ Instalação

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

O arquivo `.env` já está configurado com valores padrão:

```env
# Database
DATABASE_URL="file:./dev.db"

# Server
PORT=3001

# Email (usando Ethereal para testes)
EMAIL_HOST="smtp.ethereal.email"
EMAIL_PORT=587
EMAIL_USER=""
EMAIL_PASS=""
EMAIL_FROM="Conferência Municipal de Saúde <noreply@conferencia.com>"

# Frontend URL
FRONTEND_URL="http://localhost:5173"
```

**Nota sobre emails:**
- Por padrão, o sistema usa Ethereal (emails de teste)
- Os emails não são enviados de verdade, mas você pode visualizá-los através de um link no console
- Para usar email real, configure `EMAIL_USER` e `EMAIL_PASS` com suas credenciais SMTP

### 3. Gerar Prisma Client

```bash
npx prisma generate
```

### 4. Rodar migrations (se necessário)

```bash
npx prisma migrate dev
```

## ▶️ Como Executar

### Modo desenvolvimento (com hot reload)

```bash
npm run dev
```

O servidor estará rodando em: **http://localhost:3001**

### Modo produção

```bash
# Build
npm run build

# Start
npm start
```

## 📡 Endpoints da API

Base URL: `http://localhost:3001/api`

### Health Check
- **GET** `/health` - Verifica se o servidor está rodando

### Inscrições (Registrations)

#### Criar inscrição
- **POST** `/api/registrations`
- Body:
```json
{
  "name": "Nome Completo",
  "cpf": "12345678900",
  "email": "email@example.com",
  "phone": "11999999999",
  "birthdate": "1990-01-01",
  "rg": "123456789",
  "gender": "Masculino",
  "race": "Branca",
  "address": "Rua Exemplo, 123",
  "city": "São Paulo",
  "state": "SP",
  "zip_code": "01234-567",
  "delegate_type": "Titular",
  "organization": "Organização XYZ",
  "position": "Cargo",
  "accessCode": "ABC123"
}
```

#### Listar todas as inscrições
- **GET** `/api/registrations`

#### Buscar inscrição por ID
- **GET** `/api/registrations/:id`

#### Buscar inscrição por código de acesso
- **GET** `/api/registrations/code/:code`

#### Filtrar inscrições
- **GET** `/api/registrations/filter?search=nome&delegate_type=Titular&certificateIssued=true`

#### Atualizar inscrição
- **PUT** `/api/registrations/:id`

#### Deletar inscrição
- **DELETE** `/api/registrations/:id`

#### Autorizar certificado
- **PATCH** `/api/registrations/:id/certificate`

## 🗄️ Banco de Dados

### Ver banco de dados (Prisma Studio)

```bash
npm run prisma:studio
```

Abrirá uma interface web em `http://localhost:5555` onde você pode:
- Visualizar todas as inscrições
- Editar registros manualmente
- Executar queries

### Schema do banco

A tabela `registrations` contém:
- `id` - UUID único
- `name` - Nome completo
- `cpf` - CPF (único)
- `email` - Email
- `phone` - Telefone
- `birthdate` - Data de nascimento
- `rg` - RG (opcional)
- `gender` - Gênero (opcional)
- `race` - Raça/cor (opcional)
- `address` - Endereço (opcional)
- `city` - Cidade (opcional)
- `state` - Estado (opcional)
- `zip_code` - CEP (opcional)
- `delegate_type` - Tipo de delegado (opcional)
- `organization` - Organização (opcional)
- `position` - Cargo (opcional)
- `accessCode` - Código de acesso (único)
- `emailSent` - Email foi enviado? (boolean)
- `certificateIssued` - Certificado emitido? (boolean)
- `created_date` - Data de criação
- `updated_date` - Data de atualização

## 📧 Sistema de Email

O sistema envia automaticamente um email de confirmação quando uma inscrição é criada.

### Email de Teste (Ethereal)

Por padrão, usa Ethereal para emails de teste:
- Os emails não são enviados de verdade
- Cada email gera um link no console para visualização
- Não requer configuração

### Email Real (SMTP)

Para usar email real, configure no `.env`:

```env
EMAIL_HOST="smtp.gmail.com"  # ou outro provedor
EMAIL_PORT=587
EMAIL_USER="seu-email@gmail.com"
EMAIL_PASS="sua-senha-ou-app-password"
```

**Gmail:** Você precisará gerar uma "Senha de App" nas configurações de segurança.

## 🔧 Scripts Disponíveis

```bash
npm run dev              # Inicia servidor em modo desenvolvimento
npm run build            # Compila TypeScript para JavaScript
npm start                # Inicia servidor em produção
npm run prisma:generate  # Gera Prisma Client
npm run prisma:migrate   # Cria nova migration
npm run prisma:studio    # Abre Prisma Studio
```

## 🐛 Troubleshooting

### Porta 3001 já está em uso

```bash
# Linux/Mac - encontrar processo na porta 3001
lsof -i :3001

# Matar processo
kill -9 <PID>
```

### Erro "Cannot find module '@prisma/client'"

```bash
npx prisma generate
```

### Banco de dados não sincronizado

```bash
npx prisma migrate reset  # ⚠️ Apaga todos os dados!
npx prisma migrate dev
```

## 📊 Monitoramento

O servidor loga automaticamente:
- ✅ Inscrições criadas
- ✏️  Inscrições atualizadas
- 🗑️  Inscrições deletadas
- ✉️  Emails enviados
- ❌ Erros

## 🔐 Segurança

- CORS configurado para aceitar apenas requisições do frontend
- Validação de dados obrigatórios
- Verificação de CPF duplicado
- Tratamento de erros adequado

## 🚀 Próximos Passos

Para produção, considere:
1. Migrar para PostgreSQL ou MySQL
2. Implementar autenticação JWT
3. Adicionar rate limiting
4. Configurar logs estruturados
5. Implementar cache (Redis)
6. Adicionar testes automatizados
7. Configurar CI/CD
8. Usar serviço de email profissional (SendGrid, AWS SES, etc.)

## 📝 Licença

Este projeto está sob licença MIT.
