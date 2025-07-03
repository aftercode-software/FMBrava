interface ImportMetaEnv {
  readonly MODE: "development" | "production";
  readonly CMS_API_BASE: string;
  readonly CMS_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
