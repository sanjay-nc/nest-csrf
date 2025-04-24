// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  // Mock user data
  private users = [
    { username: 'admin', password: 'admin123', id: 1 },
    { username: 'user', password: 'user123', id: 2 },
  ];

  // Function to validate login credentials
  validateCredentials(username: string, password: string) {
    const user = this.users.find(
      (user) => user.username === username && user.password === password,
    );
    return user ? { id: user.id, username: user.username } : null;
  }
}
