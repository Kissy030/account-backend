import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
@Injectable()
export class AuthGuard implements CanActivate {
  @Inject(JwtService)
  private jwtService: JwtService;
  canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();
    let token = request.cookies?.access_token;
    if (!token) {
      const authHeader = request.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7); // 'Bearer '.length === 7
      }
    }
    if (!token) {
      throw new UnauthorizedException('登录凭证缺失');
    }
    try {
      const payload = this.jwtService.verify(token);
      (request as any).user = payload.user;
      return true;
    } catch (e) {
      throw new UnauthorizedException('登录 token 失效，请重新登录');
    }
  }
}
