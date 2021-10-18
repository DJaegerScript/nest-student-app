import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { AppService } from 'src/app/app.service';
import { ResponseBodyDTO } from 'src/app/dto/app.dto';

import { Repository } from 'typeorm';

import { CreateStudentRequest } from './dto/create-student.dto';
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
    const results = await this.studentRepository.find();

    if (results.length === 0)
      return this.generateResponseBody(true, results, 'Student data is empty');

    return this.generateResponseBody(
      true,
      results,
      'Student data retrieved successfully!',
    );
  }

  async storeStudent(student: CreateStudentRequest): Promise<ResponseBodyDTO> {
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
}
