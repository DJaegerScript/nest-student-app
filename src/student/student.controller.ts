import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';

import { Response } from 'express';

import { ResponseBodyDTO } from 'src/app/dto/app.dto';

import { StudentService } from './student.service';

import { CreateStudentDTO } from './dto/create-student.dto';
import { GetStudentDetailsParamsDTO } from './dto/get-student-details.dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  async getAllStudents(
    @Res() response: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const result: ResponseBodyDTO = await this.studentService.getStudents();
    return response.status(HttpStatus.OK).json(result);
  }

  @Post()
  async storeStudent(
    @Body() body: CreateStudentDTO,
    @Res() response: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const result: ResponseBodyDTO = await this.studentService.storeStudent(
      body,
    );

    if (!result.success)
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(result);

    return response.status(HttpStatus.CREATED).json(result);
  }

  @Get('/:studentId')
  async getStudentDetails(
    @Param() params: GetStudentDetailsParamsDTO,
    @Res() response: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const result = await this.studentService.getStudentDetails(
      params.studentId,
    );

    return response.status(HttpStatus.OK).json(result);
  }
}
