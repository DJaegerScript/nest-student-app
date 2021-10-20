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
import { ClassDTO, ClassParamsDTO } from './dto/class.dto';

@Controller('class')
export class ClassController extends AppController {

  @Get()
  async getClasses(
    @Res() response: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const results: ResponseBodyInterface = await this.classService.getClasses();

    return this.sendResponse(results, response);
  }

  @Post()
  async storeClass(
    @Body() body: ClassDTO,
    @Res() response: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const results: ResponseBodyInterface = await this.classService.storeClass(

    return this.sendResponse(results, response, HttpStatus.CREATED);
  }

  @Get('/:classId')
  async getClassDetails(
    @Param() params: ClassParamsDTO,
    @Res() response: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const results: ResponseBodyInterface =
      await this.classService.getClassDetails(classId);
    return this.sendResponse(results, response);
  }

  @Put('/:classId')
  async updateClass(
    @Param() params: ClassParamsDTO,
    @Body() body: ClassDTO,
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
    @Param() params: ClassParamsDTO,
    @Res() response: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const results: ResponseBodyInterface = await this.classService.deleteClass(
      classId,
    );

    return this.sendResponse(results, response);
  }
}
