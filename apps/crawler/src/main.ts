/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { Colors } from './utils';

import * as apicache from 'apicache';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.port || 3000;
  const cache = apicache.middleware;
  // app.use(cache('5 days'));
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  });
  await app.listen(port, () => {
    console.log(
      Colors.FGBLUE,
      'Listening at http://localhost:' + port + '/' + globalPrefix
    );
  });
}

bootstrap();
