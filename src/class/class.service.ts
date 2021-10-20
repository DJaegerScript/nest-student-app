import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { AppService } from 'src/app/app.service';
import { ResponseBodyInterface } from 'src/app/interfaces/app.interface';

import { Repository } from 'typeorm';
import { ClassDetailsInterface } from './interfaces/class-details.interface';

import { ClassesInterface } from './interfaces/classes.interface';
import { ModifiedClassInterface } from './interfaces/modified-class.interface';
import { Class } from './entities/class.entity';

@Injectable()
export class ClassService extends AppService {
  constructor(
    @InjectRepository(Class)
    private readonly classRepository: Repository<Class>,
  ) {
    super();
  }

  async getClasses(): Promise<ResponseBodyInterface> {
    try {
      const results: ClassDetailsInterface[] =
        await this.classRepository.find();

      return results.length === 0
        ? this.generateEmptyResponseBody('Class')
        : this.generateResponseBody(
            true,
            'Class data retrieved successfully!',
            results,
          );
    } catch (error: any) {
      return this.generateErrorResponseBody(error);
    }
  }

  async storeClass(
    classData: ClassesInterface,
  ): Promise<ResponseBodyInterface> {
    try {
      const results = await this.classRepository.save(classData);

      return this.generateResponseBody(
        true,
        'Class data created successfully!',
        results,
      );
    } catch (error: any) {
      return this.generateErrorResponseBody(error);
    }
  }

  async getClassDetails(id: number): Promise<ResponseBodyInterface> {
    try {
      const results: ClassDetailsInterface = await this.classRepository.findOne(
        id,
        {
          relations: ['students'],
        },
      );

      return !results
        ? this.generateEmptyResponseBody('Class')
        : this.generateResponseBody(
            true,
            'Class data retrieved successfully!',
            results,
          );
    } catch (error: any) {
      return this.generateErrorResponseBody(error);
    }
  }

  async updateClass(
    id: number,
    classData: ClassesInterface,
  ): Promise<ResponseBodyInterface> {
    try {
      const results: ModifiedClassInterface = await this.classRepository.update(
        id,
        classData,
      );

      return results.affected
        ? this.generateResponseBody(true, 'Class data updated successfully!')
        : this.generateEmptyResponseBody('Class', 'update');
    } catch (error: any) {
      return this.generateErrorResponseBody(error);
    }
  }

  async deleteClass(id: number): Promise<ResponseBodyInterface> {
    try {
      const results: ModifiedClassInterface = await this.classRepository.delete(
        id,
      );

      return results.affected
        ? this.generateResponseBody(true, 'Class data deleted successfully!')
        : this.generateEmptyResponseBody('Class', 'delete');
    } catch (error: any) {
      return this.generateErrorResponseBody(error);
    }
  }
}
