import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'nestuser', // your MySQL username
      password: 'nestpassword', // your MySQL password
      database: 'nest_login_api', // your MySQL database name
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // auto load all entity files
      synchronize: true, // only for development
    }),
    AuthModule, // auth module for login/register
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

