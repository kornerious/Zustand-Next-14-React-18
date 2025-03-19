import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Callback, Context, Handler } from 'aws-lambda';
import serverlessExpress from '@vendia/serverless-express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Allow frontend to access backend
  await app.init(); // Ensure app is initialized
  const expressApp = app.getHttpAdapter().getInstance();

  return serverlessExpress({ app: expressApp }); // Convert to Vercel-compatible handler
}

// ✅ Export handler for Vercel
export const handler: Handler = (event: any, context: Context, callback: Callback) => {
  bootstrap().then((server) => server(event, context, callback));
};
