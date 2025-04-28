import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { doubleCsrf } from 'csrf-csrf';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  const doubleCsrfOptions = {
    getSecret: () => "secretbro123",
    cookieName: 'x-csrf-token',
    size: 64,
    cookieOptions: {
      httpOnly: true,
      secure: false, 
      sameSite: 'strict'  as const,
    },
  };

  const {
    doubleCsrfProtection,
    generateToken,
  } = doubleCsrf(doubleCsrfOptions);

    
  app.use((req, res, next) => {
    res.locals.generateCsrfToken = () => generateToken(req, res);
    next();
  });
  
  app.use(doubleCsrfProtection);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
