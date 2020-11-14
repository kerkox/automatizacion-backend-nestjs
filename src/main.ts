import { AllExceptionFilterFilter } from './filters/all-exception-filter.filter';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
require('dotenv').config();

const PORT  = process.env.PORT || 3000

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor())
  // app.useGlobalInterceptors(new ErrorsInterceptor())
  app.useGlobalFilters(new AllExceptionFilterFilter());
  await app.listen(PORT);
}
bootstrap();
