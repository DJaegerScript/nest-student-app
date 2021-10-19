import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassModule } from 'src/class/class.module';
import { Class } from 'src/class/entities/class.entity';

import { Student } from 'src/student/entities/student.entity';
import { StudentModule } from 'src/student/student.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST,
      port: parseInt(process.env.PG_PORT),
      username: process.env.PG_USERNAME,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      entities: [Student, Class],
      synchronize: true,
    }),
    StudentModule,
    ClassModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
