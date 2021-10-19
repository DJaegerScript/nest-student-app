export class StudentDTO {
  name: string;
  age: number;
  address: string;
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

export class ModifiedStudentDTO {
  affected?: number;
}
