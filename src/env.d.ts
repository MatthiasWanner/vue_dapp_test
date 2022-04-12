/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface ImportMetaEnv {
  readonly VITE_PARTNER_WALLET_ADDRESS: string;
  readonly VITE_PARTNER_FEE_PERCENTAGE: string;
  readonly VITE_PAYMENT_WALLET_ADDRESS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
