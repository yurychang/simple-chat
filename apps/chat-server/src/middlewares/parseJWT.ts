import { redis } from '@/loaders/redis';
import { AuthTokenPayload } from '@/types';
import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const parseJwt = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    try {
      const inDenylist = await redis.get(`bl_${token}`);
      if (inDenylist) {
        return res.sendStatus(401);
      }

      const payload = jwt.verify(token, process.env.JWT_SECRET!);
      req.authToken = token;
      req.authPayload = payload as unknown as AuthTokenPayload;
      next();
    } catch (error) {
      return res.sendStatus(403);
    }
  } else {
    return res.sendStatus(401);
  }
};
