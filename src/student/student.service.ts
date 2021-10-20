import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { AppService } from 'src/app/app.service';
import { ResponseBodyInterface } from 'src/app/interfaces/app.interface';

import { Repository } from 'typeorm';
import {
  StudentDTO,
  GetStudentsDTO,
  StudentDetailsDTO,
  ModifiedStudentDTO,
} from './dto/student.dto';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentService extends AppService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {
    super();
  }

  async getStudents(): Promise<ResponseBodyInterface> {
    try {
      const results: GetStudentsDTO[] = await this.studentRepository
        .createQueryBuilder('student')
        .select(['student.id', 'student.name'])
        .getMany();

      if (results.length === 0)
        return this.generateResponseBody(
          true,
          results,
          'Student data is empty',
        );

      return this.generateResponseBody(
        true,
        results,
        'Student data retrieved successfully!',
      );
    } catch (error: any) {
      console.log(error.message);
      return this.generateResponseBody(false, [], 'Oops, something went wrong');
    }
  }

  ): Promise<ResponseBodyInterface> {
    try {
      const results: StudentDetailsDTO = await this.studentRepository.save(
        student,
      );

      return this.generateResponseBody(
        true,
        results,
        'Student data created successfully!',
      );
    } catch (error: any) {
      console.log(error.message);
      return this.generateResponseBody(false, [], 'Oops, something went wrong');
    }
  }

  async getStudentDetails(id: number): Promise<ResponseBodyInterface> {
    try {
      const results: StudentDetailsDTO = await this.studentRepository.findOne(
        id,
      );

      if (!results)
        return this.generateResponseBody(true, [], 'Student data not found!');

      return this.generateResponseBody(
        true,
        results,
        'Student data retrieved successfully!',
      );
    } catch (error: any) {
      console.log(error.message);
      return this.generateResponseBody(false, [], 'Oops, something went wrong');
    }
  }

  async updateStudent(
    id: number,
  ): Promise<ResponseBodyInterface> {
    try {
      const results: ModifiedStudentDTO = await this.studentRepository.update(
        id,
        student,
      );

      if (!results.affected)
        return this.generateResponseBody(
          true,
          [],
          'Could not update, student data not found!',
        );

      return this.generateResponseBody(
        true,
        [],
        'Student data updated successfully!',
      );
    } catch (error: any) {
      console.log(error.message);
      return this.generateResponseBody(false, [], 'Oops, something went wrong');
    }
  }

  async deleteStudent(id: number): Promise<ResponseBodyInterface> {
    try {
      const results: ModifiedStudentDTO = await this.studentRepository.delete(
        id,
      );

      if (!results.affected)
        return this.generateResponseBody(
          true,
          [],
          'Could not delete, student data not found!',
        );

      return this.generateResponseBody(
        true,
        [],
        'Student data deleted successfully!',
      );
    } catch (error: any) {
      console.log(error.message);
      return this.generateResponseBody(false, [], 'Oops, something went wrong');
    }
  }
}
