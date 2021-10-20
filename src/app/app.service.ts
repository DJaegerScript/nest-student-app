import { Injectable } from '@nestjs/common';
import { ResponseBodyInterface } from './interfaces/app.interface';

@Injectable()
export class AppService {
  protected generateResponseBody(
    success: boolean,
    content: any[] | Record<string, any>,
    message = '',
    content: any[] | Record<string, any> = [],
  ): ResponseBodyInterface {
    return { success, content, message };
  }
  protected generateErrorResponseBody(error: any): ResponseBodyInterface {
    console.log(error.message);
    return this.generateResponseBody(false, 'Oops, something went wrong');
  }
}
