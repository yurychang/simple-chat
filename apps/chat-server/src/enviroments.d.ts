declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      WEB_HOST: string;
      JWT_SECRET: string;
      DATABASE_URL: string;
      REDIS_URL: string;
    }
  }
}

export {};
