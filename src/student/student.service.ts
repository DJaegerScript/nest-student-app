import { Injectable } from '@nestjs/common';

@Injectable()
export class StudentService {
  getAllStudentsService(): string {
    return 'All student retrieved';
  }
}
