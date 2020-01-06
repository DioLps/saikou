/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/

import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';

import { AppModule } from './app/app.module';
import { Colors } from './utils';
import { NotFoundExceptionFilter } from './app/filters/http-exception.filter';

import * as express from 'express';
import * as yargs from 'yargs';
import { join } from 'path';

const server = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  const argv = yargs.argv;
  const port = argv.port || 5000;
  app.use(setCors);

  // Serve only the static files form the angularapp directory
  app.use(express.static(join(__dirname, '..', 'saikou-animes')));
  app.useGlobalFilters(new NotFoundExceptionFilter());

  await app.listen(port + '', () => {
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
