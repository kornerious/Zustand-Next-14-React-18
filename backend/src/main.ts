import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  await app.listen(process.env.PORT || 4000);
  console.log(`🚀 Server running on http://localhost:${process.env.PORT || 4000}`);
}

if (process.env.NODE_ENV !== 'production') {
  bootstrap(); // ✅ Run locally with npm run start:dev
}
