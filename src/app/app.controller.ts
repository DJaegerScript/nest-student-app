import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';

import { ResponseBodyInterface } from 'src/app/interfaces/app.interface';

export class AppController {
  protected sendResponse(
    data: ResponseBodyInterface,
    response: Response,
    successCode: number = HttpStatus.OK,
  ): Response<any, Record<string, any>> {
    if (!data.success)
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(data);

    return response.status(successCode).json(data);
  }
}
