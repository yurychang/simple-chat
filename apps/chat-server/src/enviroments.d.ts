declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      WEB_HOST: string;
      DATABASE_URL: string;
    }
  }
}

export {};
