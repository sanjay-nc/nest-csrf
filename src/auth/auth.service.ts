// src/auth/auth.service.ts
import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDto } from "./dto/login.dto"; // Same LoginDto for now

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  // Register new user
  async register(loginDto: LoginDto): Promise<any> {
    const { username, password } = loginDto;

    // Check if user already exists
    const existingUser = await this.userRepository.findOne({ where: { username } });
    if (existingUser) {
      throw new BadRequestException('Username already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const newUser = this.userRepository.create({ username, password: hashedPassword });
    await this.userRepository.save(newUser);

    return { message: 'User registered successfully' };
  }

  // Login user
  async login(loginDto: LoginDto): Promise<any> {
    const { username, password } = loginDto;
    
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return { message: 'Login successful', user: { username: user.username } };
  }
}
