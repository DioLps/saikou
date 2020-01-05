/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/

import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';

import { AppModule } from './app/app.module';
import { Colors } from './utils';
import * as express from 'express';
import { join } from 'path';
import { NotFoundExceptionFilter } from './app/filters/http-exception.filter';

const server = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  const port = process.env.port || 3000;
  app.use(setCors);
  // Serve only the static files form the angularapp directory
  app.use(express.static(join(__dirname, '..', 'saikou-animes')));
  app.useGlobalFilters(new NotFoundExceptionFilter());

  await app.listen(port, () => {
    console.log(Colors.FGBLUE, 'Listening at http://localhost:' + port);
  });
}

bootstrap();

const setCors = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
};
