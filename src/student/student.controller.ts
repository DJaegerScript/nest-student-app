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
import { ResponseBodyInterface } from 'src/app/interfaces/app.interface';
import { AppController } from 'src/app/app.controller';

@Controller('student')
export class StudentController extends AppController {

  @Get()
  async getAllStudents(
    @Res() response: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const results: ResponseBodyInterface =

    return this.sendResponse(results, response);
  }

  @Post()
  async storeStudent(
    @Body() body: StudentDTO,
    @Res() response: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const results: ResponseBodyInterface =

    return this.sendResponse(results, response, HttpStatus.CREATED);
  }

  @Get('/:studentId')
  async getStudentDetails(
    @Param() params: StudentParamsDTO,
    @Res() response: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const results: ResponseBodyInterface =

    return this.sendResponse(results, response);
  }

  @Put('/:studentId')
  async updateStudent(
    @Param() params: StudentParamsDTO,
    @Body() body: StudentDTO,
    @Res() response: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const results: ResponseBodyInterface =

    return this.sendResponse(results, response);
  }

  @Delete('/:studentId')
  async deleteStudent(
    @Param() params: StudentParamsDTO,
    @Res() response: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const results: ResponseBodyInterface =

    return this.sendResponse(results, response);
  }
}
