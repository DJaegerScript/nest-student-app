import { Student } from 'src/student/entities/student.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Student, (student) => student.classroom, { nullable: false })
  students: Student[];
}
