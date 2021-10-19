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
import { ClassService } from './class.service';
import { ClassDTO, ClassParamsDTO } from './dto/class.dto';

@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Get()
  async getClasses(
    @Res() response: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const result: ResponseBodyDTO = await this.classService.getClasses();

    return response.status(HttpStatus.OK).json(result);
  }

  @Post()
  async storeClass(
    @Body() body: ClassDTO,
    @Res() response: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const result: ResponseBodyDTO = await this.classService.storeClass(body);
    if (!result.success)
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(result);

    return response.status(HttpStatus.CREATED).json(result);
  }

  @Get('/:classId')
  async getClassDetails(
    @Param() params: ClassParamsDTO,
    @Res() response: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const results: ResponseBodyDTO = await this.classService.getClassDetails(
      params.classId,
    );
    return response.status(HttpStatus.OK).json(results);
  }

  @Put('/:classId')
  async updateClass(
    @Param() params: ClassParamsDTO,
    @Body() body: ClassDTO,
    @Res() response: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const results: ResponseBodyDTO = await this.classService.updateClass(
      params.classId,
      body,
    );

    return response.status(HttpStatus.OK).json(results);
  }

  @Delete('/:classId')
  async deleteClass(
    @Param() params: ClassParamsDTO,
    @Res() response: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const results: ResponseBodyDTO = await this.classService.deleteClass(
      params.classId,
    );

    return response.status(HttpStatus.OK).json(results);
  }
}
