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
import { AppController } from 'src/app/app.controller';
import { ResponseBodyInterface } from 'src/app/interfaces/app.interface';
import { ClassService } from './class.service';
import { ClassesInterface } from './interfaces/classes.interface';

@Controller('class')
export class ClassController extends AppController {
  constructor(private readonly classService: ClassService) {
    super();
  }

  @Get()
  async getClasses(
    @Res() response: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const results: ResponseBodyInterface = await this.classService.getClasses();

    return this.sendResponse(results, response);
  }

  @Post()
  async storeClass(
    @Body() body: ClassesInterface,
    @Res() response: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const results: ResponseBodyInterface = await this.classService.storeClass(
      body,
    );

    return this.sendResponse(results, response, HttpStatus.CREATED);
  }

  @Get('/:classId')
  async getClassDetails(
    @Param('classId') classId: number,
    @Res() response: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const results: ResponseBodyInterface =
      await this.classService.getClassDetails(classId);

    return this.sendResponse(results, response);
  }

  @Put('/:classId')
  async updateClass(
    @Param('classId') classId: number,
    @Body() body: ClassesInterface,
    @Res() response: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const results: ResponseBodyInterface = await this.classService.updateClass(
      classId,
      body,
    );

    return this.sendResponse(results, response);
  }

  @Delete('/:classId')
  async deleteClass(
    @Param('classId') classId: number,
    @Res() response: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const results: ResponseBodyInterface = await this.classService.deleteClass(
      classId,
    );

    return this.sendResponse(results, response);
  }
}
