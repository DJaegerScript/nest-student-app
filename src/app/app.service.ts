import { Injectable } from '@nestjs/common';
import { ResponseBodyInterface } from './interfaces/app.interface';

@Injectable()
export class AppService {
  protected generateResponseBody(
    success: boolean,
    content: any[] | Record<string, any>,
    message = '',
  ): ResponseBodyInterface {
    return { success, content, message };
  }
}
