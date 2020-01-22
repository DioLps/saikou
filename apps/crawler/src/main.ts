/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/

import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';

import { AppModule } from './app/app.module';
import { Colors } from './utils';
import { environment } from './environments/environment';

import * as express from 'express';

const server = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  let port = '5000';
  if (environment.production) {
    port = process.env.PORT;
  }
  app.use(setCors);

  await app.listen(port, '0.0.0.0', () => {
    console.log(Colors.FGBLUE, 'Listening at http://localhost:' + port);
  });
}

bootstrap().catch(reason => {
  console.log(
    Colors.FGBLUE,
    Colors.BGWHITE,
    ' ====== Erro com o contexto do nest ======= '
  );
  console.log(Colors.FGWHITE, Colors.BGRED, reason);
});

const setCors = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
};
