// src/auth/auth.controller.ts
import { Controller, Post, Body, Req, Res, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: any, @Req() req: Request, @Res() res: Response) {
    const { username, password } = body;

    // Validate credentials via AuthService
    const user = this.authService.validateCredentials(username, password);

    if (user) {
      // Successful login
      return res.status(HttpStatus.OK).json({
        message: 'Login successful 🔓',
        user,
      });
    } else {
      // Failed login attempt
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: 'Invalid credentials 🛑',
      });
    }
  }
}
