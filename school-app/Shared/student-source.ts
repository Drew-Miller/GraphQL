import { students, colleges } from './data';
import { Student } from './dto';

export class StudentSource {
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