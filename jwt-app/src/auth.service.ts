import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  getUser(userId) {
    if (userId === '1') {
      return { username: 'toto', secret: '123', userId: '1' };
    } else {
      return { username: 'tata', secret: '456', userId: '2' };
    }
  }
}

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  validateUser(payload) {
    console.log('validate');
    return this.userService.getUser(payload.userId);
  }

  createToken(userId: string) {
    const user = this.userService.getUser(userId);
    return jwt.sign({ userId: user.userId }, user.secret, { expiresIn: 3600 });
  }
}
