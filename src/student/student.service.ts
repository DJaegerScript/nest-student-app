import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { AppService } from 'src/app/app.service';
import { ResponseBodyDTO } from 'src/app/dto/app.dto';

import { Repository } from 'typeorm';
import {
  CreateStudentDTO,
  GetStudentsDTO,
  StudentDetailsDTO,
  UpdateStudentDTO,
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

  async getStudents(): Promise<ResponseBodyDTO> {
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
    } catch (error) {
      console.log(error.message);
      return this.generateResponseBody(false, [], 'Oops, something went wrong');
    }
  }

  async storeStudent(student: CreateStudentDTO): Promise<ResponseBodyDTO> {
    try {
      await this.studentRepository.save(student);

      return this.generateResponseBody(
        true,
        [],
        'Student data created successfully!',
      );
    } catch (error) {
      console.log(error.message);
      return this.generateResponseBody(false, [], 'Oops, something went wrong');
    }
  }

  async getStudentDetails(id: number): Promise<ResponseBodyDTO> {
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
    } catch (error) {
      console.log(error.message);
      return this.generateResponseBody(false, [], 'Oops, something went wrong');
    }
  }

  async updateStudent(
    id: number,
    student: UpdateStudentDTO,
  ): Promise<ResponseBodyDTO> {
    try {
    const results = await this.studentRepository.update(id, student);

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
    } catch (error) {
      console.log(error.message);
      return this.generateResponseBody(false, [], 'Oops, something went wrong');
    }
    return this.generateResponseBody(
      true,
      results,
      'Student data retrieved successfully!',
    );
  }
}
