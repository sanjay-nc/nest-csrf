// src/auth/auth.controller.ts
import { Controller, Post, Get, Body, Req, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';  // Import the DTO

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/csrf')
  @ApiResponse({ status: 200, description: 'Returns CSRF token' })
  getToken(@Req() req: Request, @Res() res: Response) {
    const token = res.locals.generateCsrfToken();
    res.status(HttpStatus.OK).json({ csrfToken: token });
  }

  @Post('/login')
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Successful login' })
  @ApiResponse({ status: 403, description: 'Invalid CSRF token' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('/register')
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 400, description: 'Username already exists' })
  async register(@Body() loginDto: LoginDto) {
    return this.authService.register(loginDto);
  }
}
