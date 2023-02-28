import { students, colleges } from './data';
import { Student } from './dto';

export class StudentSource {
  public getById(id: string): Student {
    const student = students.get(id);

    const res = {
      ...student,
      college: colleges.get(student.collegeId)
    };
    return res;
  }

  public get(): Student[] {
    return students.list().map(student => {
      const res = {
        ...student,
        college: colleges.get(student.collegeId)
      };
      return res;
    });
  }
}