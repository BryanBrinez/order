// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Request } from 'express';

declare module 'express' {
  export interface Request {
    user?: { id: number; email: string; roles?: string[] }; // Ajusta según tu payload JWT
  }
}
