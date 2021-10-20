import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { DeepPartial } from 'typeorm';

import { StudentService } from './student.service';
import { ResponseBodyInterface } from 'src/app/interfaces/app.interface';
import { Student } from './entities/student.entity';
import { AppController } from 'src/app/app.controller';

@Controller('student')
export class StudentController extends AppController {
  constructor(private readonly studentService: StudentService) {
    super();
  }

  @Get()
  async getAllStudents(
    @Res() response: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const results: ResponseBodyInterface =
      await this.studentService.getStudents();

    return this.sendResponse(results, response);
  }

  @Post()
  async storeStudent(
    @Body() body: DeepPartial<Student>,
    @Res() response: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const results: ResponseBodyInterface =
      await this.studentService.storeStudent(body);

    return this.sendResponse(results, response, HttpStatus.CREATED);
  }

  @Get('/:studentId')
  async getStudentDetails(
    @Param('studentId') studentId: number,
    @Res() response: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const results: ResponseBodyInterface =
      await this.studentService.getStudentDetails(studentId);

    return this.sendResponse(results, response);
  }

  @Put('/:studentId')
  async updateStudent(
    @Param('studentId') studentId: number,
    @Body() body: DeepPartial<Student>,
    @Res() response: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const results: ResponseBodyInterface =
      await this.studentService.updateStudent(studentId, body);

    return this.sendResponse(results, response);
  }

  @Delete('/:studentId')
  async deleteStudent(
    @Param('studentId') studentId: number,
    @Res() response: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const results: ResponseBodyInterface =
      await this.studentService.deleteStudent(studentId);

    return this.sendResponse(results, response);
  }
}
