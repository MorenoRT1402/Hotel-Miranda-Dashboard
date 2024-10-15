interface ImportMetaEnv {
    VITE_CLIENT_PORT:number,
    VITE_BASE_URL:string,
    VITE_API_URL:string,
    API_URL:string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  