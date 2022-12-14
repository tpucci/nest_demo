import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

export const viteNodeApp = NestFactory.create<NestFastifyApplication>(
  AppModule,
  new FastifyAdapter(),
);
