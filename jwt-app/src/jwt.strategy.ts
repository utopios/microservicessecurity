import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService, UserService } from './auth.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKeyProvider: (request, jwtToken, done) => {
        const decodedToken: any = jwt.decode(jwtToken);
        const user = this.userService.getUser(decodedToken.userId);
        done(null, user.secret);
      },
    });
  }

  async validate(payload) {
    console.log("test")
    const user = await this.authService.validateUser(payload);
    if (!user) {
      throw new Error();
    }
    return user;
  }
}
