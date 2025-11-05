# Sistema de Conferência Municipal de Saúde

Sistema completo para gerenciamento de inscrições e emissão de certificados para conferências municipais de saúde.

## 🎯 Funcionalidades

### Frontend (React + TypeScript)
- ✅ Formulário de inscrição completo e validado
- ✅ Consulta de certificado por código de acesso
- ✅ Geração de certificado em PDF
- ✅ Painel administrativo para gerenciar inscrições
- ✅ Sistema de autorização de certificados
- ✅ Filtros e busca de participantes
- ✅ Interface responsiva e moderna

### Backend (Node.js + TypeScript)
- ✅ API REST completa
- ✅ Banco de dados SQLite local
- ✅ Envio automático de email de confirmação
- ✅ CRUD completo de inscrições
- ✅ Sistema de busca e filtros
- ✅ Validações e tratamento de erros

## 🏗️ Estrutura do Projeto

```
conferencia/
├── conferencia-app/        # Frontend React
│   ├── src/
│   ├── public/
│   ├── .env               # Configurações do frontend
│   └── package.json
│
├── conferencia-backend/   # Backend Node.js
│   ├── src/
│   ├── prisma/
│   ├── .env               # Configurações do backend
│   └── package.json
│
└── README.md             # Este arquivo
```

## 🚀 Como Executar

### Requisitos
- Node.js 18+ instalado
- npm ou yarn

### 1️⃣ Backend

```bash
# Entrar no diretório do backend
cd conferencia-backend

# Instalar dependências (se ainda não instalou)
npm install

# Gerar Prisma Client (se ainda não gerou)
npx prisma generate

# Iniciar o servidor
npm run dev
```

O backend estará rodando em: **http://localhost:3001**

### 2️⃣ Frontend

```bash
# Em outro terminal, entrar no diretório do frontend
cd conferencia-app

# Instalar dependências (se ainda não instalou)
npm install

# Iniciar o frontend
npm run dev
```

O frontend estará rodando em: **http://localhost:5173** (ou 5174 se a porta estiver ocupada)

### 3️⃣ Acessar o Sistema

Abra seu navegador em: **http://localhost:5173** (ou a porta que o Vite indicar)

## 📱 Como Usar

### Fazer uma Inscrição

1. Acesse a página inicial
2. Clique em "Realizar Inscrição"
3. Preencha o formulário com seus dados
4. Clique em "Realizar Inscrição"
5. Guarde o código de acesso que aparecerá no modal
6. Você receberá um email de confirmação (veja logs do backend para o link do email de teste)

### Consultar Certificado

1. Na página inicial, clique na aba "Certificado"
2. Digite seu código de acesso
3. Se o certificado estiver autorizado, você poderá visualizá-lo e baixar em PDF

### Painel Administrativo

1. Clique em "Admin" no menu superior
2. Senha padrão: `admin123`
3. Você poderá:
   - Ver todas as inscrições
   - Buscar por nome, email ou CPF
   - Filtrar por tipo de delegado
   - Autorizar certificados
   - Editar ou excluir inscrições

## 🗄️ Banco de Dados

O sistema usa **SQLite** como banco de dados local. O arquivo `dev.db` será criado automaticamente no diretório `conferencia-backend/`.

### Visualizar o Banco de Dados

```bash
cd conferencia-backend
npm run prisma:studio
```

Abrirá uma interface web em `http://localhost:5555`

## 📧 Sistema de Email

Por padrão, o sistema usa **Ethereal** para emails de teste:
- Os emails não são enviados de verdade
- Cada email gera um link de visualização no console do backend
- Não requer configuração

**Exemplo de log no console:**
```
✉️  Email enviado com sucesso: <message-id>
🔗 Visualize o email em: https://ethereal.email/message/xxxxx
```

Para configurar email real, edite o arquivo `conferencia-backend/.env`:

```env
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT=587
EMAIL_USER="seu-email@gmail.com"
EMAIL_PASS="sua-senha-de-app"
```

## 🔧 Configurações

### Frontend (.env em conferencia-app/)
```env
VITE_API_URL=http://localhost:3001/api
```

### Backend (.env em conferencia-backend/)
```env
DATABASE_URL="file:./dev.db"
PORT=3001
EMAIL_HOST="smtp.ethereal.email"
EMAIL_PORT=587
EMAIL_USER=""
EMAIL_PASS=""
FRONTEND_URL="http://localhost:5173"
```

## 📊 Endpoints da API

Base: `http://localhost:3001/api`

- `POST /registrations` - Criar inscrição
- `GET /registrations` - Listar todas as inscrições
- `GET /registrations/:id` - Buscar por ID
- `GET /registrations/code/:code` - Buscar por código de acesso
- `GET /registrations/filter` - Filtrar inscrições
- `PUT /registrations/:id` - Atualizar inscrição
- `DELETE /registrations/:id` - Deletar inscrição
- `PATCH /registrations/:id/certificate` - Autorizar certificado

## 🛠️ Tecnologias Utilizadas

### Frontend
- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router
- jsPDF (geração de PDFs)
- Lucide Icons

### Backend
- Node.js
- Express
- TypeScript
- Prisma ORM
- SQLite
- Nodemailer
- CORS

## 🐛 Problemas Comuns

### Porta ocupada
Se a porta 3001 (backend) ou 5173 (frontend) estiver ocupada:

```bash
# Encontrar processo
lsof -i :3001  # ou :5173

# Matar processo
kill -9 <PID>
```

### Erro de CORS
Certifique-se de que o backend está rodando antes do frontend.

### Erro "Cannot find module @prisma/client"
```bash
cd conferencia-backend
npx prisma generate
```

### Frontend não conecta ao backend
Verifique se a URL no arquivo `conferencia-app/.env` está correta:
```env
VITE_API_URL=http://localhost:3001/api
```

## 📝 Para Desenvolvedores

### Estrutura do Código

#### Frontend
- `src/Register.tsx` - Formulário de inscrição
- `src/Admin.tsx` - Painel administrativo
- `src/integrations/Core.ts` - Cliente da API
- `src/entities/Registration.ts` - Interface de dados

#### Backend
- `src/server.ts` - Servidor Express
- `src/controllers/` - Lógica de negócio
- `src/routes/` - Definição de rotas
- `src/services/` - Serviços (email, etc.)
- `prisma/schema.prisma` - Schema do banco

### Adicionar Novos Campos

1. Adicione o campo no schema Prisma (`conferencia-backend/prisma/schema.prisma`)
2. Rode `npx prisma migrate dev --name nome_da_migration`
3. Atualize a interface no frontend (`conferencia-app/src/entities/Registration.ts`)
4. Adicione o campo no formulário (`conferencia-app/src/Register.tsx`)

## 🚀 Próximos Passos

- [ ] Deploy em produção (Vercel/Railway/Heroku)
- [ ] Migrar banco para PostgreSQL
- [ ] Implementar autenticação JWT
- [ ] Adicionar upload de fotos
- [ ] Sistema de presença (QR Code)
- [ ] Relatórios e estatísticas
- [ ] Testes automatizados
- [ ] CI/CD

## 📄 Licença

MIT

## 👨‍💻 Suporte

Para dúvidas ou problemas:
1. Verifique os logs do backend e frontend
2. Consulte a documentação nos READMEs específicos
3. Verifique se todas as dependências foram instaladas
4. Certifique-se de que ambos os servidores estão rodando

---

**Status do Sistema:**
- ✅ Backend: Totalmente funcional
- ✅ Frontend: Totalmente funcional
- ✅ Banco de Dados: SQLite configurado
- ✅ Emails: Sistema de teste (Ethereal) funcionando
- ✅ Integração: Frontend ↔️ Backend conectados
