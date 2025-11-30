import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Req,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';

import { RedisService } from 'src/redis/redis.service';
import { AuthCodeDto } from './dto/AuthCode.dto';
import { LoginDto } from './dto/Login.dto';
import { Response } from 'express';
import { RegisterDto } from './dto/Register.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Inject(JwtService)
  private jwtService: JwtService;

  @Inject()
  private redisService: RedisService;

  @Post('authcode')
  async authcode(
    @Body() authCodeDto: AuthCodeDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { email, code } = authCodeDto;
    const codeInRedis = await this.redisService.get(`captcha_${email}`);
    if (!codeInRedis) {
      throw new HttpException('验证失败，验证码错误或已失效', 400);
    }
    if (code !== codeInRedis) {
      // return { status: 400, message: '验证失败，验证码错误' }; //400验证码错误
      throw new HttpException('验证失败，验证码错误或已失效', 400);
    }
    const foundUser = await this.userService.findUserByEmail(email);
    const user = foundUser || (await this.userService.register(email));
    const token = await this.jwtService.signAsync({
      user: { id: user.id, email: user.email },
    });
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
      path: '/',
      sameSite: 'lax',
    });
    await this.redisService.del(`captcha_${email}`);
    return { statusCode: 200 };
  }

  @Get('status')
  getStatus(@Req() req) {
    const token = req.cookies?.access_token;
    if (!token) return { isLoggedIn: false };
    try {
      this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
      return { isLoggedIn: true };
    } catch {
      return { isLoggedIn: false };
    }
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: false, // 与设置时一致
      path: '/',
      sameSite: 'lax',
    });

    return { statusCode: HttpStatus.OK, message: '登出成功' };
  }
}
