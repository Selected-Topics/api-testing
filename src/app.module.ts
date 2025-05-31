import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ApiTokenGuard } from './auth/guards/api-token.guard';
import { AuthenticationGuard } from './auth/guards/authentication.guard';
import { JwtGuard } from './auth/guards/jwt.guard';
import jwtConfig from './config/jwt.config';
import mongoConfig from './config/mongo.config';
import { HealthModule } from './health/health.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    AuthModule,
    ProductModule,
    OrderModule,
    HealthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwtConfig, mongoConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const mongoConfig = configService.get<{ mongoUri: string }>('mongo');
        const mongoUri = mongoConfig?.mongoUri;
        return {
          uri: mongoUri,
        };
      },
      inject: [ConfigService],
    }),
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
