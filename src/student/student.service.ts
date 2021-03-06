import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { AppService } from 'src/app/app.service';
import { ResponseBodyInterface } from 'src/app/interfaces/app.interface';

import { DeepPartial, Repository } from 'typeorm';

import { ModifiedStudentInterface } from './interfaces/modified-student.interface';
import { StudentDetailsInterface } from './interfaces/student-details.interface';
import { StudentsInterface } from './interfaces/students.interface';
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
      const results: StudentsInterface[] = await this.studentRepository
        .createQueryBuilder('student')
        .select(['student.id', 'student.name'])
        .getMany();

      return results.length === 0
        ? this.generateEmptyResponseBody('Student')
        : this.generateResponseBody(
            true,
            'Student data retrieved successfully!',
            results,
          );
    } catch (error: any) {
      return this.generateErrorResponseBody(error);
    }
  }

  async storeStudent(
    student: DeepPartial<Student>,
  ): Promise<ResponseBodyInterface> {
    try {
      const results: StudentDetailsInterface =
        await this.studentRepository.save(student);

      return this.generateResponseBody(
        true,
        'Student data created successfully!',
        results,
      );
    } catch (error: any) {
      return this.generateErrorResponseBody(error);
    }
  }

  async getStudentDetails(id: number): Promise<ResponseBodyInterface> {
    try {
      const results: StudentDetailsInterface =
        await this.studentRepository.findOne(id, {
          relations: ['classroom'],
        });

      return !results
        ? this.generateEmptyResponseBody('Student')
        : this.generateResponseBody(
            true,
            'Student data retrieved successfully!',
            results,
          );
    } catch (error: any) {
      return this.generateErrorResponseBody(error);
    }
  }

  async updateStudent(
    id: number,
    student: DeepPartial<Student>,
  ): Promise<ResponseBodyInterface> {
    try {
      const results: ModifiedStudentInterface =
        await this.studentRepository.update(id, student);

      return results.affected
        ? this.generateResponseBody(true, 'Student data updated successfully!')
        : this.generateEmptyResponseBody('Student', 'update');
    } catch (error: any) {
      return this.generateErrorResponseBody(error);
    }
  }

  async deleteStudent(id: number): Promise<ResponseBodyInterface> {
    try {
      const results: ModifiedStudentInterface =
        await this.studentRepository.delete(id);

      return results.affected
        ? this.generateResponseBody(true, 'Student data deleted successfully!')
        : this.generateEmptyResponseBody('Student', 'delete');
    } catch (error: any) {
      return this.generateErrorResponseBody(error);
    }
  }
}
