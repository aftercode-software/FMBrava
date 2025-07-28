interface ImportMetaEnv {
  readonly MODE: "development" | "production";
  readonly CMS_API_BASE: string;
  readonly CMS_API_KEY: string;
  readonly META_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
