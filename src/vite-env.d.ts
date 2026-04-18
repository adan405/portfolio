/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Get a free key at https://web3forms.com — add this in Vercel → Environment Variables */
  readonly VITE_WEB3FORMS_ACCESS_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
