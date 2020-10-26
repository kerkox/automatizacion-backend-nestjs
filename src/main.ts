import { ErrorsInterceptor } from './interceptors/errors.interceptor';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalInterceptors(new TransformInterceptor())
  app.useGlobalInterceptors(new ErrorsInterceptor())
  await app.listen(3000);
}
bootstrap();
