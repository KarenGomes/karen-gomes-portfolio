# Portfolio — React + TypeScript + Vite + Tailwind

Aplicação de portfólio em React com arquitetura modular (`components/`, `hooks/`, `models/`, `services/`, `context/`) e consumo de API via `VITE_API_URL`.

## Requisitos

- **Node.js**: 18.x (recomendado **>= 18.18**)  
- **npm**: 7+

## Configuração de ambiente

Crie um arquivo `.env` na raiz (já existe neste projeto) com:

```env
VITE_API_URL=https://exemplo.lambda-url.us-east-2.on.aws/
```

## Comandos

Instalar dependências:

```bash
npm install
```

Rodar em modo desenvolvimento (HMR):

```bash
npm run dev
```

Gerar build de produção:

```bash
npm run build
```

Pré-visualizar o build:

```bash
npm run preview
```

## Estrutura (resumo)

- `src/services/portfolioApi.ts`: chamadas de API + mapeamento para modelos locais
- `src/hooks/usePortfolioData.ts`: hook de dados (loading/error/data)
- `src/context/ThemeContext.tsx`: tema dark/light
- `src/components/*`: UI componentizada (Navbar, Hero, Projetos, Experiência, Footer)
