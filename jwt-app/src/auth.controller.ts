import { Get, Controller, Query, UseGuards, Param, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login/:id')
  async login(@Param('id') userId: string): Promise<any> {
    return await this.authService.createToken(userId);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(@Req() request) {
    console.log('request');
    return request.user;
  }
}
