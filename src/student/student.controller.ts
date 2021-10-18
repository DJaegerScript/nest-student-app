import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ResponseBodyDTO } from 'src/app/dto/app.dto';
import { CreateStudentRequest } from './dto/create-student.dto';

import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  async storeStudent(
    @Body() body: CreateStudentRequest,
    @Res() response: Response,
  ): Promise<Response<any, Record<string, unknown>>> {
    const result: ResponseBodyDTO = await this.studentService.storeStudent(
      body,
    );

    if (!result.success)
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(result);

    return response.status(HttpStatus.CREATED).json(result);
  }
}
