import { Class } from 'src/class/entities/class.entity';
import { StudentsInterface } from './students.interface';

export class StudentDetailsInterface extends StudentsInterface {
  age: number;
  address: string;
  classroom: Class;
}
