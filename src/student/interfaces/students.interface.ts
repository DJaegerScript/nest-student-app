import { Student } from '../entities/student.entity';

export class StudentsInterface {
  id: number;
  name: string;
  students?: Student[];
}
