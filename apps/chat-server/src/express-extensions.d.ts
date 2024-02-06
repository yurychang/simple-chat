import { AuthTokenPayload } from './types';

declare global {
  namespace Express {
    interface Request {
      authToken?: string;
      authPayload?: AuthTokenPayload;
    }
  }
}

export {};
