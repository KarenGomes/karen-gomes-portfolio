/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string
  readonly VITE_WEB3FORMS_ACCESS_KEY?: string
  readonly VITE_LINKEDIN_PROFILE_URL?: string
  readonly VITE_HCAPTCHA_SITEKEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
