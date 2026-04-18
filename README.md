# Portfolio — React + TypeScript + Vite + Tailwind

SPA de portfólio com dados dinâmicos via API, tema claro/escuro e formulário de contato (Web3Forms + hCaptcha).

**Site em produção:** [https://karengomes.vercel.app/](https://karengomes.vercel.app/)

## Requisitos

- **Node.js**: 18.x (recomendado **≥ 18.18**)
- **npm**: 7+

## Configuração rápida

1. Copie `.env.example` para `.env` na raiz e preencha as variáveis (ver [documentação](./documentacao/README.md)).
2. `npm install`
3. `npm run dev`

## Comandos

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Desenvolvimento com HMR |
| `npm run build` | Typecheck + build de produção (`dist/`) |
| `npm run preview` | Servir o build localmente |
| `npm run lint` | ESLint |

## Documentação

- **[Guia completo do projeto (estrutura, ambiente, API, contato, deploy)](./documentacao/README.md)**

## Estrutura (resumo)

- `src/services/portfolioApi.ts` — chamadas à API e mapeamento para modelos
- `src/hooks/usePortfolioData.ts` — estado dos dados do portfólio
- `src/context/` — tema (`ThemeProvider` + `theme-context`)
- `src/components/` — UI (Navbar, Hero, projetos, experiência, Footer, `ContactModal`, etc.)
