import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import jwtConfig from './config/jwt.config';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { HealthModule } from './health/health.module';
import { AuthenticationGuard } from './auth/guards/authentication.guard';
import { JwtGuard } from './auth/guards/jwt.guard';
import { ApiTokenGuard } from './auth/guards/api-token.guard';

@Module({
  imports: [
    AuthModule,
    ProductModule,
    OrderModule,
    HealthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwtConfig],
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/api-testing'),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    JwtGuard,
    ApiTokenGuard,
  ],
})
export class AppModule {}
