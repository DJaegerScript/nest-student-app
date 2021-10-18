import { Injectable } from '@nestjs/common';
import { ResponseBodyDTO } from './dto/app.dto';

@Injectable()
export class AppService {
  protected generateResponseBody(
    success: boolean,
    content: any[] | Record<string, any>,
    message = '',
  ): ResponseBodyDTO {
    return { success, content, message };
  }
}
