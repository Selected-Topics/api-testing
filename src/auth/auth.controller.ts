import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/jwt-auth.guard';
import { User } from 'src/user/user.decorator';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginDto } from './dtos/login.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { AccessTokenRto } from './rtos/access-token.rto';
import { UserRto } from './rtos/user.rto';
import { Public } from './decorators/public.decorator';

@UseInterceptors()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() body: CreateUserDto): Promise<UserRto> {
    const user = await this.authService.register(body);

    return UserRto.fromDocument(user);
  }

  @Public()
  @Post('login')
  async login(@Body() body: LoginDto): Promise<AccessTokenRto> {
    const response = await this.authService.login(body);

    return AccessTokenRto.fromAccessToken(response);
  }

  @Patch('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@User('userId') userId: string): Promise<void> {
    return this.authService.logout(userId);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async retrieveProfile(@User('userId') userId: string): Promise<UserRto> {
    return this.authService.findUserById(userId);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @User('userId') userId: string,
    @Body() body: UpdateUserDto,
  ): Promise<UserRto> {
    return this.authService.updateUser(userId, body);
  }
}
