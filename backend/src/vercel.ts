import { NestFactory } from '@nestjs/core';
import { Handler, Context, Callback } from 'aws-lambda';
import serverlessExpress from '@vendia/serverless-express';
import { AppModule } from './app.module';

let cachedServer: Handler;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.init();
    const expressApp = app.getHttpAdapter().getInstance();
    return serverlessExpress({ app: expressApp });
}

export const handler: Handler = (event: any, context: Context, callback: Callback) => {
    if (!cachedServer) {
        bootstrap().then(server => {
            cachedServer = server;
            cachedServer(event, context, callback);
        });
    } else {
        cachedServer(event, context, callback);
    }
};
