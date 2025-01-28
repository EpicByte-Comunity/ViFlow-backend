import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(process.env.PORT);

  logger.log('');
  logger.log(`App running on port ${process.env.PORT}`);
  logger.log(`App running at ${process.env.HOST_API}`);
}
bootstrap();
