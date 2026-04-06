/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STRIPE_PUBLISHABLE_KEY_LIVE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
