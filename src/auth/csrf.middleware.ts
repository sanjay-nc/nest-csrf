// src/auth/csrf.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { doubleCsrf } from 'csrf-csrf';

const doubleCsrfOptions = {
  getSecret: () => "secretbro123",
  cookieName: 'x-csrf-token',
  size: 64,
  cookieOptions: {
    httpOnly: true,
    secure: false,
    sameSite: 'strict' as const,
  },
};

const { validateRequest } = doubleCsrf(doubleCsrfOptions);

@Injectable()
export class CsrfMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const valid = validateRequest(req);
    if (!valid) {
      return res.status(403).json({ message: 'Invalid CSRF token 😤' });
    }
    next();
  }
}
