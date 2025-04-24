// src/app.controller.ts
import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  getHello(): any {
    throw new Error('Method not implemented.');
  }
  @Get('csrf')
  getCsrfToken(@Req() req: Request, @Res() res: Response) {
    const token = res.locals.generateCsrfToken();
    res.status(200).json({ csrfToken: token });
  }

  
}
