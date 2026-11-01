/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE?: string;
  readonly VITE_SITE_URL?: string;
  readonly VITE_PROPERTY_PHONE?: string;
  readonly VITE_PROPERTY_WHATSAPP?: string;
  readonly VITE_PROPERTY_EMAIL?: string;
  readonly VITE_PROPERTY_ADDRESS?: string;
  readonly VITE_GOOGLE_MAPS_EMBED_URL?: string;
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
  readonly VITE_GA_MEASUREMENT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
