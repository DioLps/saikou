import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';

@Controller('api')
export class ApiController {
  @Get()
  root(@Res() res: Response) {
    return res.sendFile(join(__dirname, '/assets/index.html'));
  }
}
