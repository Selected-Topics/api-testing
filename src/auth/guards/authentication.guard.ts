/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ErrorMessage } from '../../enums/authentication/error-message.enum';
import { ApiTokenGuard } from './api-token.guard';
import { JwtGuard } from './jwt.guard';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private readonly logger = new Logger(AuthenticationGuard.name);

  constructor(
    private readonly jwtGuard: JwtGuard,
    private readonly apiTokenGuard: ApiTokenGuard,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    const request: Request = context.switchToHttp().getRequest();

    const bearerToken: string | undefined =
      request.headers.authorization?.startsWith('Bearer ')
        ? request.headers.authorization
        : request.cookies?.accessToken
          ? `Bearer ${request.cookies.accessToken}`
          : undefined;

    if (bearerToken) {
      const canActivate = await this.jwtGuard.canActivate(context);
      return Boolean(canActivate);
    }

    if (isPublic) {
      return true;
    }

    throw new UnauthorizedException(ErrorMessage.UNAUTHORIZED);
  }
}
