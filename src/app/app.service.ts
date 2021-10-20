import { Injectable } from '@nestjs/common';
import { ResponseBodyInterface } from './interfaces/app.interface';

@Injectable()
export class AppService {
  protected generateResponseBody(
    success: boolean,
    message = '',
    content: any[] | Record<string, any> = [],
  ): ResponseBodyInterface {
    return { success, content, message };
  }

  protected generateErrorResponseBody(error: any): ResponseBodyInterface {
    console.log(error.message);
    return this.generateResponseBody(false, 'Oops, something went wrong');
  }

  protected generateEmptyResponseBody(entity: string, action: string = null) {
    const message = !action
      ? `${entity} data not found`
      : `Could not ${action}, ${entity} data not found!`;

    return this.generateResponseBody(true, message);
  }
}
