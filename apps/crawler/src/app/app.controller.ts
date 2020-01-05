import { Get, Controller, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';

@Controller()
export class AppController {
  @Get()
  root(@Res() res: Response) {
    return res.sendFile(join(__dirname, '/assets/index.html'));
  }
}
