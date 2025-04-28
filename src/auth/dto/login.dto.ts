// src/auth/dto/login.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'The username of the user',
    type: String,
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'The password of the user',
    type: String,
  })
  @IsString()
  password: string;
}
