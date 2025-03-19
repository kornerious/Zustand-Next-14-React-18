import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(), // Load .env file
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as 'postgres' | 'sqlite',
      host: process.env.DB_TYPE === 'postgres' ? process.env.DB_HOST : undefined, // Use host only for Postgres
      database: process.env.DB_TYPE === 'sqlite'
          ? process.env.NODE_ENV === 'production'
              ? '/tmp/database.sqlite' // ✅ Serverless path for Vercel
              : join(__dirname, '..', 'data', 'database.sqlite') // ✅ Local SQLite path
          : process.env.DB_NAME, // Use DB_NAME for Postgres
      username: process.env.DB_TYPE === 'postgres' ? process.env.DB_USER : undefined,
      password: process.env.DB_TYPE === 'postgres' ? process.env.DB_PASS : undefined,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
