import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppService } from 'src/app/app.service';
import { ResponseBodyInterface } from 'src/app/interfaces/app.interface';
import { Repository } from 'typeorm';
import { ClassDTO, GetClassDTO } from './dto/class.dto';
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
      const results: GetClassDTO[] = await this.classRepository.find();

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

  ): Promise<ResponseBodyInterface> {
    try {
      const results = await this.classRepository.save(classData);

      return this.generateResponseBody(
        true,
        results,
        'Class data created successfully!',
      );
    } catch (error: any) {
      return this.generateErrorResponseBody(error);
    }
  }

  async getClassDetails(id: number): Promise<ResponseBodyInterface> {
    try {
      const results = await this.classRepository.findOne(id);

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

  ): Promise<ResponseBodyInterface> {
    try {
      const results = await this.classRepository.update(id, classData);

      if (!results.affected)
        return this.generateResponseBody(
          true,
          [],
          'Could not update, class data not found!',
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
      const results = await this.classRepository.delete(id);
      if (!results.affected)
        return this.generateResponseBody(
          true,
          [],
          'Could not delete, student data not found!',
        );

      return results.affected
        ? this.generateResponseBody(true, 'Class data deleted successfully!')
        : this.generateEmptyResponseBody('Class', 'delete');
    } catch (error: any) {
      return this.generateErrorResponseBody(error);
    }
  }
}
