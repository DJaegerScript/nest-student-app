import { Class } from 'src/class/entities/class.entity';

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  address: string;

  @ManyToOne(() => Class, (classroom) => classroom.students, {
    onDelete: 'SET NULL',
  })
  classroom: Class;
}
