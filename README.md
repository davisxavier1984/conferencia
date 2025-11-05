# Sistema de Inscrição - VI Conferência Municipal de Saúde

Sistema de inscrição online para a VI Conferência Municipal de Saúde de São Borja.

## Tecnologias Utilizadas

- **Next.js 14** - Framework React para produção
- **React 18** - Biblioteca JavaScript para construção de interfaces
- **Tailwind CSS** - Framework CSS utilitário
- **Radix UI** - Componentes de UI acessíveis
- **Lucide React** - Ícones

## Funcionalidades

### Página de Inscrição (/)
- Formulário completo de inscrição
- Validação de campos obrigatórios
- Armazenamento local das inscrições
- Redirecionamento para página de confirmação

### Página de Confirmação (/confirmation)
- Confirmação visual da inscrição
- Instruções sobre próximos passos
- Link para retornar à página inicial

### Área Administrativa (/admin)
- Acesso protegido por senha
- Listagem de todas as inscrições
- Exportação de dados em CSV
- Exclusão de inscrições
- Logout seguro

**Senha de acesso administrativo:** `conferencia2025`

## Estrutura do Projeto

```
conferencia/
├── src/
│   ├── components/
│   │   ├── ui/              # Componentes UI reutilizáveis
│   │   └── Layout.jsx       # Layout principal
│   ├── entities/
│   │   └── User.js          # Entidade de usuário
│   ├── lib/
│   │   └── utils.js         # Funções utilitárias
│   ├── pages/
│   │   ├── _app.js          # Configuração do App
│   │   ├── _document.js     # Configuração do Document
│   │   ├── index.js         # Página de inscrição
│   │   ├── admin.js         # Área administrativa
│   │   └── confirmation.js  # Página de confirmação
│   ├── styles/
│   │   └── globals.css      # Estilos globais
│   └── utils/
│       └── index.js         # Utilitários de rota
├── package.json
├── next.config.js
├── tailwind.config.js
└── jsconfig.json
```

## Instalação

```bash
npm install
```

## Desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## Build para Produção

```bash
npm run build
```

## Deploy na Vercel

Este projeto está otimizado para deploy na Vercel:

1. Faça push do código para o repositório Git
2. Conecte o repositório na Vercel
3. A Vercel detectará automaticamente o Next.js e configurará o build

## Armazenamento de Dados

Atualmente, o sistema utiliza **localStorage** para armazenar as inscrições. Para produção, recomenda-se:

- Implementar um banco de dados (PostgreSQL, MongoDB, etc.)
- Criar API routes no Next.js (`/pages/api`)
- Adicionar validação server-side
- Implementar autenticação segura

## Melhorias Futuras

- [ ] Integração com banco de dados
- [ ] API REST para gerenciamento de inscrições
- [ ] Autenticação JWT para área administrativa
- [ ] Envio de e-mail de confirmação
- [ ] Sistema de check-in no dia do evento
- [ ] Geração de certificados digitais
- [ ] Dashboard com estatísticas

## Licença

© 2025 Secretaria Municipal de Saúde / Conselho Municipal de Saúde de São Borja
