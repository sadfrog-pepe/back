import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.NEST_PORT;
  await app.listen(port);
  console.log(`Backend Application listening on port ${port}`);
}
bootstrap();
