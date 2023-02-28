import { students, colleges } from './data';
import { College, Student } from './data/types';

export class CollegeSource {
  public get(): College[] {
    return colleges.list().map(college => {
      const res = {
        ...college,
        students: students
          .list()
          .filter(student => student.collegeId == college.id)
      };
      return res;
    });
  }
}