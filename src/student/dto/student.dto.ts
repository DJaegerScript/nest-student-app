export class CreateStudentDTO {
  name: string;
  age: number;
  address: string;
}

export class UpdateStudentDTO {
  name?: string;
  age?: number;
  address?: string;
}

export class GetStudentsDTO {
  id: number;
  name: string;
}

export class StudentParamsDTO {
  studentId: number;
}

export class StudentDetailsDTO {
  id: number;
  name: string;
  age: number;
  address: string;
}
