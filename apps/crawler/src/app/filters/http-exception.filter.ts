import * as path from 'path';
import {
  ExceptionFilter,
  Catch,
  NotFoundException,
  ArgumentsHost
} from '@nestjs/common';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  constructor() {}
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    if (exception.getStatus() === 404) {
      return response.sendFile(
        path.join(__dirname, '..', 'saikou-animes/index.html')
      );
    }
  }
}
