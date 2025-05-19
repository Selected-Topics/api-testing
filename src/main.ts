import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        return new UnprocessableEntityException(
          errors.map((err) => ({
            field: err.property,
            constraints: err.constraints,
          })),
        );
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
