import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { ErrorMessage } from '../../enums/authentication/error-message.enum';

@Injectable()
export class ApiTokenGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = request.headers.apikey;

    if (!apiKey) {
      throw new UnauthorizedException(ErrorMessage.INVALID_API_KEY);
    }

    const validApiKey = this.configService.get<string>('API_KEY');
    if (apiKey !== validApiKey) {
      throw new UnauthorizedException(ErrorMessage.INVALID_API_KEY);
    }

    return true;
  }
}
