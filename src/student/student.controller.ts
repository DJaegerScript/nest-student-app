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

import { ResponseBodyDTO } from 'src/app/dto/app.dto';
import { StudentDTO, StudentParamsDTO } from './dto/student.dto';

import { StudentService } from './student.service';

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
    @Body() body: StudentDTO,
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
    @Param() params: StudentParamsDTO,
    @Res() response: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const results: ResponseBodyDTO =
      await this.studentService.getStudentDetails(params.studentId);

    return response.status(HttpStatus.OK).json(results);
  }

  @Put('/:studentId')
  async updateStudent(
    @Param() params: StudentParamsDTO,
    @Body() body: StudentDTO,
    @Res() response: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const results: ResponseBodyDTO = await this.studentService.updateStudent(
      params.studentId,
      body,
    );

    return response.status(HttpStatus.OK).json(results);
  }

  @Delete('/:studentId')
  async deleteStudent(
    @Param() params: StudentParamsDTO,
    @Res() response: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const results: ResponseBodyDTO = await this.studentService.deleteStudent(
      params.studentId,
    );

    return response.status(HttpStatus.OK).json(results);
  }
}
