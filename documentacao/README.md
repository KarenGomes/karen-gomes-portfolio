# Guia do projeto — portfólio

Documentação para manutenção, evolução e onboarding de outros desenvolvedores. **Não inclua chaves de API, URLs de backend privadas ou dados pessoais sensíveis em repositórios públicos.**

## Visão geral

Aplicação **SPA** em **React 18**, **TypeScript**, **Vite 5** e **Tailwind CSS 3**. Consome uma **API HTTP** (URL configurável) para listar projetos e experiências profissionais, e usa **Web3Forms** + **hCaptcha** para o formulário de contato no rodapé.

| Área        | Descrição breve |
|------------|------------------|
| UI         | Componentes em `src/components/`, tema claro/escuro via contexto |
| Dados      | `usePortfolioData` → `fetchPortfolioData` em `src/services/portfolioApi.ts` |
| Contato    | `ContactModal` + `getContactConfig()` + variáveis `VITE_*` |
| Estilo global | `src/index.css` (Tailwind + animação do toast) |

## Requisitos

- **Node.js** 18.x (recomendado ≥ 18.18)
- **npm** 7+

## Comandos

| Comando | Efeito |
|---------|--------|
| `npm install` | Instala dependências |
| `npm run dev` | Servidor de desenvolvimento (HMR) |
| `npm run build` | `tsc` + build de produção em `dist/` |
| `npm run preview` | Servir o build localmente |
| `npm run lint` | ESLint (flat config) |

## Estrutura de pastas (`src/`)

```
src/
├── App.tsx                 # Página única: Navbar, Hero, TechStack, ProjectGrid, ExperienceTimeline, Footer
├── main.tsx                # Entrada React + ThemeProvider
├── index.css               # Tailwind + utilitário `animate-toast-in`
├── vite-env.d.ts           # Tipos das variáveis `import.meta.env`
├── assets/                 # Imagens e PDF (ex.: CV)
├── components/
│   ├── ContactModal.tsx    # Fluxo contato (formulário / LinkedIn) + Web3Forms
│   ├── Footer.tsx          # Ícones sociais, abre modal e controla Toast
│   ├── ui/                 # Button, Toast, Container
│   └── …                   # Hero, Navbar, ProjectGrid, etc.
├── config/
│   └── contact.ts          # `getContactConfig()` — lê apenas `VITE_*`
├── context/
│   ├── theme-context.ts    # `ThemeContext` + tipo
│   └── ThemeProvider.tsx   # Persistência do tema em `localStorage`
├── hooks/
│   ├── usePortfolioData.ts # Estado da API de portfólio
│   ├── useTheme.ts         # Consome ThemeContext
│   └── useTypewriter.ts    # Efeito de digitação no Hero
├── models/
│   └── portfolio.ts        # Tipos da API e modelos internos
└── services/
    └── portfolioApi.ts     # `fetch` + mapeamento JSON → modelos
```

## Variáveis de ambiente

Ficheiro na **raiz**: `.env` ou `.env.local` (ver `.env.example`). O Vite expõe apenas variáveis prefixadas com **`VITE_`**.

| Variável | Uso |
|----------|-----|
| `VITE_API_URL` | URL da API que devolve JSON com `projects` e `experiences` (obrigatória para dados dinâmicos) |
| `VITE_WEB3FORMS_ACCESS_KEY` | Access key do painel Web3Forms para o formulário de e-mail |
| `VITE_LINKEDIN_PROFILE_URL` | URL pública do perfil LinkedIn (rodapé + modal) |
| `VITE_HCAPTCHA_SITEKEY` | Site key pública do hCaptcha (integração Web3Forms) |

### Segurança e `VITE_*`

Tudo o que começa por `VITE_` é **embutido no JavaScript** enviado ao navegador. Não são segredos de servidor. Para o formulário:

- Mitigue abuso no **painel Web3Forms** (domínios permitidos, limites).
- O **site key** do hCaptcha é **sempre** pública no cliente; a validação ocorre no serviço.

Para **não expor** a access key do Web3Forms, seria necessário um **backend** (ex.: função serverless) que adiciona a chave no servidor — fora do âmbito deste front-end estático.

**Nunca** commite ficheiros `.env` com valores reais em repositórios públicos. Use `.env.example` só com placeholders.

## API de dados do portfólio

- **Endpoint:** valor de `VITE_API_URL` (GET).
- **Resposta esperada:** objeto JSON com `projects[]` e `experiences[]` alinhados a `PortfolioApiResponse` em `src/models/portfolio.ts`.
- **Mapeamento:** `Id` (string) da API é convertido para `id` numérico local; experiências são ordenadas por `order`.

Se `VITE_API_URL` estiver ausente, o hook trata erro; a UI usa listas vazias onde aplicável.

## Tema claro / escuro

- `ThemeProvider` guarda preferência em `localStorage` (`karen.dev.theme`).
- `useTheme()` expõe `isDarkMode`, `toggle` e `setDarkMode`.
- Contexto está separado (`theme-context.ts`) do provider (`ThemeProvider.tsx`) para compatibilidade com Fast Refresh / ESLint.

## Formulário de contato

1. Utilizador clica no ícone de **e-mail** no `Footer` → abre `ContactModal`.
2. Pode escolher **e-mail pelo site** (formulário) ou **LinkedIn** (link externo).
3. Envio: `POST` para `https://api.web3forms.com/submit` com `FormData` (`name`, `email`, `message`, `access_key`, `h-captcha-response`, `subject`).
4. Sucesso: modal fecha e o `Footer` mostra **Toast** temporário (~4 s).

Ative **hCaptcha** no painel Web3Forms para o formulário correspondente à access key.

## Build e artefactos

- Saída: pasta **`dist/`** (HTML, JS, CSS hasheados, assets).
- Hospedar como site estático (qualquer CDN, S3+CloudFront, Netlify, Vercel, etc.).
- Definir as mesmas variáveis `VITE_*` no painel do host de CI/CD (sem prefixo diferente).

## Manutenção comum

| Tarefa | Onde atuar |
|--------|------------|
| Alterar textos do Hero | `Hero.tsx`, constantes no topo |
| Novos projetos / experiências | Backend/API ou JSON servido pela Lambda |
| Ajustar links sociais (GitHub) | `Footer.tsx` |
| Mudar mensagem do toast de sucesso | constante `SUCCESS_FEEDBACK` em `ContactModal.tsx` |
| Duração do toast | `useEffect` em `Footer.tsx` (timeout em ms) |
| Estilos globais / animação toast | `index.css` |

## Referências externas

- [Vite — Env e modos](https://vitejs.dev/guide/env-and-mode.html)
- [Web3Forms](https://web3forms.com)
- [hCaptcha + Web3Forms](https://docs.web3forms.com/getting-started/customizations/spam-protection/hcaptcha)


